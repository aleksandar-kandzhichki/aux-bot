import AppBot from "../bot";
import { CommandNames } from "../appInterfaces/Command";
import { DiscrodPolls } from "../discord/DiscordPolls";
import { DiscordCommandReader } from "../discord/CommandReader";
import { ChatHistory } from "../appInterfaces/ChatHistory";
import { DiscordChatHistory } from "../discord/ChatHistory";
import { ICommandProcessor } from "../appInterfaces/ICommandProcessor";
import { CommandProcessor } from "../business/process-commands/command.procesor";
import AppClient from "../discord/DiscordClient";
import { getLowestDistanceCommandsFromString } from "../helpers/levenshtein-distance";
import { Message, Collection, TextChannel } from "discord.js";
import { pollListeners } from "../live-updates/poll.ws";


type processedOrder = { name: string, order: string };
const discordCommands = new DiscordCommandReader(AppClient);
const chatHistoryService: ChatHistory = new DiscordChatHistory(AppClient);
const commandProcessor: ICommandProcessor = new CommandProcessor();

const emptyMessage = { embeds: new Collection(), attachments: new Collection(), mentions: new Collection(), reactions: new Collection() }

export function register() {
    AppBot.on(CommandNames.unknown, async c => {
        const commandName = c.rawInvocation.split(' ')[0].substring(1);
        let possibleCommands = getLowestDistanceCommandsFromString(commandName);
        if (possibleCommands.length > 0) {
            await c.channel.sendMessage("Heeey looks like you might have made a mistake :), did you mean any of these: ");
            for (let command of possibleCommands) await c.channel.sendMessage(` - !${command}`);
            await c.channel.sendMessage("If not sorrryy, my mistake :)");
        }
        else c.channel.sendMessage("Unrecognized command!")
    })

    AppBot.on(CommandNames.poll, async c => {
        const data = JSON.parse(c.params.pollData as any);
        const message = c.params.message;
        const channelName = c.params.channelName;
        const pollId = c.params.pollId as string;
        const channel = AppClient.channels.array().find(channel => channelName == (channel as TextChannel).name) as (TextChannel)

        (await channel.send(message)) as Message;

        for (let itemKey in data) {
            (await channel.send(`${itemKey}: ${data[itemKey]}`)) as Message;
        }
        AppClient.on('messageReactionAdd', (react, _) => {
            pollListeners.addReactionToPoll(pollId, react.emoji.toString())
        })
        AppClient.on('messageReactionRemove', (react, _) => {
            pollListeners.removeReactionFromPoll(pollId, react.emoji.toString())
        })
    })

    AppBot.on(CommandNames.createPollFromURL, async c => {
        let { meals, restaurantName } = await commandProcessor.parseURLFoodData(c.params);
        let mappedMeals = meals.map(meal => ({ name: `${meal.mealName}   ${meal.mealPrice}`, voteOptions: ["👍"], votes: [], messageId: '' }));
        let mealObject: { [key: string]: typeof mappedMeals[0] } = {};
        for (let meal of mappedMeals) {
            mealObject[meal.name] = meal;
        }
        await c.channel.sendMessage(`Restaurant: ${restaurantName}`);
        await (new DiscrodPolls(chatHistoryService, AppClient))
            .createPoll(mealObject, c.channel);
    })

    AppBot.on(CommandNames.help, async c => c.channel.sendMessage(await commandProcessor.executeHelpCommand(c.params)))
    AppBot.on(CommandNames.test, async c => {
        await (new DiscrodPolls(chatHistoryService, AppClient))
            .createPoll({
                "option1": { name: "option1", voteOptions: ["👍", "❓"], votes: [], messageId: '' },
                "option2": { name: "option2", voteOptions: ["👎", "👍"], votes: [], messageId: '' }
            }, c.channel);
    })
    AppBot.on(CommandNames.test2, c => (new DiscrodPolls(chatHistoryService, AppClient)).reset('', '', [], c.channel))
    AppBot.ons([CommandNames.lunch, CommandNames.summary], async c => {
        c.channel.sendMessage(`Summaryzing for ${c.params.from}`)
        let history = (await chatHistoryService.getLastN(100, c.channel)).filter(msg => !discordCommands.isBotInvocation(msg.content) && !msg.author.bot);
        history = history.reduce(
            (acc, curr) =>
                ([
                    ...acc,
                    ...curr.content.split('\n').map(content => {
                        const newMsg = new Message(curr.channel,
                            { ...curr, id: curr.id, author: curr.author, ...emptyMessage, content, timestamp: curr.createdTimestamp }, curr.client
                        );
                        // newMsg.edit(content);
                        return newMsg
                    })
                ]), [] as Message[])

        let fromDate = new Date();
        if (c.params.from) {
            c.params.from = (c.params.from as string).toLowerCase();
            history = history.filter(msg => msg.content.toLowerCase().startsWith(c.params.from as string))
        }
        if (c.params.date && c.params.date != 'today') fromDate = new Date(Date.parse(c.params.date as string));

        history = history.filter(msg => isSameDay(msg.createdAt, fromDate))
        c.channel.sendMessage(`checking ${history.length} messages... \n\n #Summary: \n\n`);
        let lines: processedOrder[] = history.map(msg => ({ name: msg.member.displayName, order: extractOrder(msg.content, c.params.from as string)! }));
        c.channel.sendMessage(lines.map(msg => `${msg.name}: ${msg.order}`).join('  \n'));
        c.channel.sendMessage("\n\n # Grouping... \n\n");

        let grouped = groupByOrder(lines);

        c.channel.sendMessage(Object.keys(grouped).map(k => `${grouped[k]}x ${k}`).join('  \n'));

        return Object.keys(grouped).map(k => `${grouped[k]}x ${k}`);
    })

    AppBot.on(CommandNames.summarizePoll, async c => {
        let summarized = await (new DiscrodPolls(chatHistoryService, AppClient)).summarize(c.params.start as string, c.params.end as string, c.channel);

        c.channel.sendMessage(Object.keys(summarized).map(k => `${k}: ${Object.keys(summarized[k]).length > 0 ?
            Object.keys(summarized[k]).map(reactionName => `${reactionName} x ${summarized[k][reactionName]}`) :
            'no reactions!'
            }`).join('  \n'));

        return;
    })
    console.log("Registered commands for bot successfully!");
}

function extractOrder(text: string, searchStr?: string) {
    if (!searchStr) return text;
    return text.split("\n").find(line => line.toLowerCase().includes(searchStr))?.toLocaleLowerCase().replace(searchStr.toLowerCase(), "").replace(":", "").replace("-", "").trim();
}
function isSameDay(d1: Date, d2: Date) {
    return d1.getDate() == d2.getDate() && d1.getMonth() == d2.getMonth() && d1.getFullYear() == d2.getFullYear()
}
function groupByOrder(history: processedOrder[]): { [order: string]: number } {
    let wishes = history.reduce((obj, cur) => {
        if (obj[cur.order]) obj[cur.order]++;
        else obj[cur.order] = 1;
        return obj
    }, {} as any)
    return wishes;
}
