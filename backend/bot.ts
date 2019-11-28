import Discord from 'discord.js';
import auth from './auth.json';
import { DiscordCommandReader } from './discord/CommandReader';
import { CommandNames } from './appInterfaces/Command';


const client = new Discord.Client();

let discordCommands = new DiscordCommandReader(client);
discordCommands.commands.subscribe(c => {
  console.log(c);
  if (c.name == CommandNames.unknown) c.channel.sendMessage("Unrecognized command!");
  else c.channel.sendMessage("Summaryzing!!!")
})

client.login(auth.token);
