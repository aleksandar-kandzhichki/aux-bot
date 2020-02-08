import Discord from 'discord.js';
import { DiscordCommandReader } from './discord/CommandReader';
import { CommandNames, Command } from './appInterfaces/Command';
import { CommandProcessor } from './bussiness/process-commands/command.procesor.js';
import { CommandReader } from './appInterfaces/CommandReader';
import { ICommandProcessor } from './appInterfaces/ICommandProcessor';
import AppClient from './discord/DiscordClient';


export type BotCommandHandles = { [commandName: string]: ((command: Command) => any)[] }
export class Bot {
  client: Discord.Client;
  discordCommands: CommandReader;
  // chatHistoryService: ChatHistory;
  commandProcessor: ICommandProcessor;

  constructor(
    client: Discord.Client,
    discordCommands = new DiscordCommandReader(client),
    // chatHistoryService = new DiscordChatHistory(client),
    commandProcessor = new CommandProcessor(),
  ) {
    this.client = client;
    this.discordCommands = discordCommands;
    // this.chatHistoryService = chatHistoryService;
    this.commandProcessor = commandProcessor;

    this.discordCommands.registerCommandNames([...Object.values(CommandNames)])
    this.discordCommands.commands.subscribe(c => {
      this.registeredHandlers[c.name].forEach(handler => handler(c));
    })
  }

  registeredHandlers: BotCommandHandles = {};

  on(commandName: CommandNames, handler: (command: Command) => any): void {
    if (!!this.registeredHandlers[commandName]) this.registeredHandlers[commandName].push(handler);
    else this.registeredHandlers[commandName] = [handler];
  }
  ons(commandNames: CommandNames[], handler: (command: Command) => any): void {
    commandNames.forEach(commandName => this.on(commandName, handler))
  }
}
const AppBot = new Bot(AppClient);
export default AppBot;


// client.login(auth.token);
