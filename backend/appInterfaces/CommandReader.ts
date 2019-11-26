import { Command } from "./Command";

export interface CommandReader {
    parse(msg: string): Command;
    execute(command: Command): void;
    attachCommandsListener(): void;
}