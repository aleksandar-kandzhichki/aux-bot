import Discord from 'discord.js';
import auth from './auth.json';
import { DiscordCommandReader } from './discord/CommandReader';
import { CommandNames } from './appInterfaces/Command';


const client = new Discord.Client();

let discordCommands = new DiscordCommandReader(client);
discordCommands.registerCommandNames(Object.values(CommandNames));
discordCommands.commands.subscribe(c => {
  console.log(c);
  if (c.name == CommandNames.unknown) c.channel.sendMessage("Unrecognized command!");
  else if (c.name == CommandNames.lunchFromImage) c.channel.sendMessage("making poll from image");
  else c.channel.sendMessage("Summaryzing from messages!!!")
})

client.login(auth.token);
