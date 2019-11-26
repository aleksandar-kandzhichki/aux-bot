import { CommandReader } from "../appInterfaces/CommandReader";
import { Command, CommandNames } from "../appInterfaces/Command";
import { Subject } from "rxjs";

export class DiscordCommandReader implements CommandReader {

    commands: Subject<Command> = new Subject();

    parse(msg: string): Command {
        let command: CommandNames | undefined;
        if (msg.startsWith("summary")) command = CommandNames.summary;

        return Command.Command("ak", command, {})
    }
    attachCommandsListener(): void {
        // ... read command from discord
        let command: Command = new Command({ issuer: "", name: CommandNames.summary, params: {} });
        this.commands.next(command);
    }

}