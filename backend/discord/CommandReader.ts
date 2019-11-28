import { CommandReader } from "../appInterfaces/CommandReader";
import { CommandNames, CommandParams } from "../appInterfaces/Command";
import { Subject } from "rxjs";
import { Client } from "discord.js";
import { DiscordCommand } from "./DiscordCommand";

export class DiscordCommandReader implements CommandReader {

    constructor(private client: Client) {
        this.attachCommandsListener();
    }

    commands: Subject<DiscordCommand> = new Subject();

    parse(msg: string): { name: CommandNames, params: CommandParams } {
        let commandName: CommandNames | undefined;
        commandName = this.extractCommandName(msg)

        return { name: commandName, params: {} }
    }

    extractCommandName(msg: string): CommandNames {
        let names = Object.values(CommandNames);
        for (let name of names) {
            if (msg.includes(name)) return name as CommandNames;
        }

        return CommandNames.unknown;
    }

    isBotInvocation(msg: string): boolean {
        return msg.startsWith("!");
    }

    attachCommandsListener(): void {
        this.client.on("message", (msg) => {
            if (!this.isBotInvocation(msg.content)) return;

            let { name, params } = this.parse(msg.content);
            let command: DiscordCommand = new DiscordCommand({ issuer: msg.author, name, params, channel: msg.channel });

            this.commands.next(command);
        })
    }
}