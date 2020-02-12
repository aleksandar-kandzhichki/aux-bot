import { CommandReader } from "../appInterfaces/CommandReader";
import { CommandNames, CommandParams } from "../appInterfaces/Command";
import { Subject } from "rxjs";
import { Client } from "discord.js";
import { DiscordCommand } from "./types/DiscordCommand";

export class DiscordCommandReader implements CommandReader {
    private recognizableCommands: CommandNames[];

    constructor(private client: Client, commandNames: CommandNames[] = []) {
        this.recognizableCommands = commandNames;
        this.attachCommandsListener();
    }

    commands: Subject<DiscordCommand> = new Subject();

    parse(msg: string): { name: CommandNames, params: CommandParams } {
        const commandName = this.extractCommandName(msg)
        const params = this.extractParams(msg);

        return { name: commandName, params }
    }

    private extractCommandName(msg: string): CommandNames {
        for (let name of this.recognizableCommands) {
            if (msg.startsWith(`!${name} `) || msg == `!${name}`) return name as CommandNames;
        }

        return CommandNames.unknown;
    }
    private extractParams(msg: string): CommandParams {
        const params: CommandParams = {};
        let slices = msg.split(" ");
        for (let i in slices) {
            const slice = slices[i];
            if (slice.startsWith("--")) params[slice.slice(2)] = true;
            else if (slice.startsWith("-")) params[slice.slice(1)] = slices[+i + 1];
        }

        return params;
    }

    isBotInvocation(msg: string): boolean {
        return msg.startsWith("!");
    }

    attachCommandsListener(): void {
        this.client.on("message", (msg) => {
            if (!this.isBotInvocation(msg.content)) return;

            let { name, params } = this.parse(msg.content);
            let command: DiscordCommand = new DiscordCommand({ issuer: msg.author, name, params, channel: msg.channel, rawInvocation: msg.content });

            this.commands.next(command);
        })
    }

    registerCommandNames(commandNames: CommandNames[]) {
        this.recognizableCommands = [...this.recognizableCommands, ...commandNames];
    }
    unregisterCommandNames(commandNames: CommandNames[]) {
        this.recognizableCommands = this.recognizableCommands.filter(c => !commandNames.includes(c));
    }
}