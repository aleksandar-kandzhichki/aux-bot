import { CommandReader } from "../appInterfaces/CommandReader";
import { Command, CommandNames } from "../appInterfaces/Command";

export class DiscordCommandReader implements CommandReader {
    parse(msg: string): Command {
        let command: CommandNames | undefined;
        if (msg.startsWith("summary")) command = CommandNames.summary;

        return Command.Command("ak", command, {})
    }

    execute(command: Command): void {
        if (command.name == CommandNames.summary) console.log("EXECUTE SUMMARY");
        else console.log("UNKNOWN COMMAND")
    }
    attachCommandsListener(): void {
        throw new Error("Method not implemented.");
    }
}