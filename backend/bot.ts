import Discord from 'discord.js';
import auth from './auth.json';
import { DiscordCommandReader } from './discord/CommandReader';
import { CommandNames } from './appInterfaces/Command';
import { DiscordChatHistory } from './discord/ChatHistory';
import { CommandProcessor } from './bussiness/command.procesor.js';
import { DiscrodPolls } from './discord/DiscordPolls';


const client = new Discord.Client();
const discordCommands = new DiscordCommandReader(client);
const chatHistoryService = new DiscordChatHistory(client);
const commandProcessor = new CommandProcessor();

type processedOrder = { name: string, order: string };
let startmsgID = '', endMsgId = '';

discordCommands.registerCommandNames(Object.values(CommandNames));
discordCommands.commands.subscribe(async c => {
  console.log(c);
  if (c.name == CommandNames.unknown) return c.channel.sendMessage("Unrecognized command!");
  if (c.name == CommandNames.createPollFromURL) {
    let meals = await commandProcessor.parseURLFoodData(c.params);
    let mappedMeals = meals.map(meal => ({ name: meal, voteOptions: ["👍"], votes: [], messageId: '' }));
    let mealObject: {[key: string]: typeof mappedMeals[0]} = {};
    for(let meal of mappedMeals) {
      mealObject[meal.name] = meal;
    }
    let msgs = await (new DiscrodPolls(chatHistoryService, client))
    .createPoll(mealObject, c.channel);

    startmsgID = msgs[0];
    endMsgId = msgs[msgs.length - 1];
    //return c.channel.sendMessage(meals.toString());
  }
  if (c.name == CommandNames.help) return c.channel.sendMessage(commandProcessor.executeHelpCommand(c.params));

  if (c.name == CommandNames.test) {
    let msgs = await (new DiscrodPolls(chatHistoryService, client))
      .createPoll({
        "option1": { name: "option1", voteOptions: ["👍", "❓"], votes: [], messageId: '' },
        "option2": { name: "option2", voteOptions: ["👎", "👍"], votes: [], messageId: '' }
      }, c.channel);

    startmsgID = msgs[0];
    endMsgId = msgs[msgs.length - 1];
  }

  if (c.name == CommandNames.test2)
    return (new DiscrodPolls(chatHistoryService, client))
      .reset(startmsgID, endMsgId, [], c.channel);

  if (c.name == CommandNames.lunch || c.name == CommandNames.summary) {
    c.channel.sendMessage("Summaryzing from messages!!!")
    let history = (await chatHistoryService.getLastN(100, c.channel)).filter(msg => !discordCommands.isBotInvocation(msg.content) && !msg.author.bot);
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
  return
  // fetching messages by date with -date dateStr
  // let date: Date | undefined;
  // if (c.params.date) {
  //   if (typeof c.params.date == "string") {
  //     let parsed = Date.parse(c.params.date)
  //     if (Number.isNaN(parsed)) return c.channel.sendMessage("Could not parse date");
  //     date = new Date(parsed);
  //   }
  //   else return c.channel.sendMessage("Could not parse date");
  // }
  // return summarizeMessages(c.channel, date);
})

// async function summarizeMessages(channel: DiscordChannel, date?: Date) {
//   let history = await chatHistoryService.getByDate(date, channel);
//   channel.sendMessage(`checking ${history.length} messages!`);
// }

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

client.login(auth.token);
