import { CommandReader } from "../appInterfaces/CommandReader";
import { Command, CommandNames, CommandParams } from "../appInterfaces/Command";
import { Subject } from "rxjs";
import { Client } from "discord.js";

export class DiscordCommandReader implements CommandReader {

    constructor(private client: Client) {
        this.attachCommandsListener();
    }

    commands: Subject<Command> = new Subject();

    parse(msg: string): { name: CommandNames | undefined, params: CommandParams } {
        let commandName: CommandNames | undefined;
        if (msg.startsWith("summary")) commandName = CommandNames.summary;

        return { name: commandName, params: {} }
    }
    attachCommandsListener(): void {
        this.client.on("message", (msg) => {
            let { name, params } = this.parse(msg.content);
            if (!name) return;

            let command: Command = new Command({ issuer: msg.author, name, params });
            this.commands.next(command);
        })
    }
}