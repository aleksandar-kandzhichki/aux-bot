import Discord from 'discord.js';
import auth from './auth.json';
import { DiscordCommandReader } from './discord/CommandReader';
import { CommandNames } from './appInterfaces/Command';
import { DiscordChatHistory } from './discord/ChatHistory';


const client = new Discord.Client();
const discordCommands = new DiscordCommandReader(client);
const chatHistoryService = new DiscordChatHistory(client);

discordCommands.registerCommandNames(Object.values(CommandNames));
discordCommands.commands.subscribe(async c => {
  console.log(c);
  if (c.name == CommandNames.unknown) return c.channel.sendMessage("Unrecognized command!");
  if (c.name == CommandNames.lunchFromImage) return c.channel.sendMessage("making poll from image");


  c.channel.sendMessage("Summaryzing from messages!!!")
  let history = (await chatHistoryService.getLastN(100, c.channel)).filter(msg => !discordCommands.isBotInvocation(msg.content) && !msg.author.bot);
  if (c.params.from) history = history.filter(msg => msg.content.includes(c.params.from as string))
  c.channel.sendMessage(`checking ${history.length} messages!`);
  return c.channel.sendMessage(history.map(msg => `${msg.member.displayName}: ${msg.content}`).join('  \n'));

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

client.login(auth.token);
