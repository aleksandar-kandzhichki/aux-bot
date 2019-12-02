import { Command } from "./Command";

export interface ICommandProcessor {

    executeCommand(command: Command): any;
}