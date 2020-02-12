import { Command } from "../../appInterfaces/Command";
import { DiscordChatHistory } from "../../discord/ChatHistory";
import { ChatHistory } from "../../appInterfaces/ChatHistory";
import Discord from 'discord.js';
import { DiscordCommandReader } from "../../discord/CommandReader";

type processedOrder = { name: string, order: string };
export class LunchCommandsProcessor {
    client: Discord.Client
    chatHistoryService: ChatHistory;
    constructor(
        client: Discord.Client,
        chatHistoryService = new DiscordChatHistory(client),
    ) {

        this.client = client;
        this.chatHistoryService = chatHistoryService;
    }

    async summarizeLunch(c: Command) {
        c.channel.sendMessage("Summaryzing from messages!!!")
        let history = (await this.chatHistoryService.getLastN(100, c.channel)).filter(msg => !(new DiscordCommandReader(this.client)).isBotInvocation(msg.content) && !msg.author.bot);
        let fromDate = new Date();
        if (c.params.from) {
            c.params.from = (c.params.from as string).toLowerCase();
            history = history.filter(msg => msg.content.toLowerCase().includes(c.params.from as string))
        }
        if (c.params.date) fromDate = new Date(Date.parse(c.params.date as string));

        history = history.filter(msg => isSameDay(msg.createdAt, fromDate))
        c.channel.sendMessage(`checking ${history.length} messages... \n\n #Summary: \n\n`);
        let lines: processedOrder[] = history.map(msg => ({ name: msg.member.displayName, order: extractOrder(msg.content, c.params.from as string)! }));
        c.channel.sendMessage(lines.map(msg => `${msg.name}: ${msg.order}`).join('  \n'));
        c.channel.sendMessage("\n\n # Grouping... \n\n");

        let grouped = groupByOrder(lines);

        c.channel.sendMessage(Object.keys(grouped).map(k => `${grouped[k]}x ${k}`).join('  \n'));

        return;
    }
}



function groupByOrder(history: processedOrder[]): { [order: string]: number } {
    let wishes = history.reduce((obj, cur) => {
        if (obj[cur.order]) obj[cur.order]++;
        else obj[cur.order] = 1;
        return obj
    }, {} as any)
    return wishes;
}

function isSameDay(d1: Date, d2: Date) {
    return d1.getDate() == d2.getDate() && d1.getMonth() == d2.getMonth() && d1.getFullYear() == d2.getFullYear()
}

function extractOrder(text: string, searchStr?: string) {
    if (!searchStr) return text;
    return text.split("\n").find(line => line.toLowerCase().includes(searchStr))?.toLocaleLowerCase().replace(searchStr.toLowerCase(), "").replace(":", "").replace("-", "").trim();
}