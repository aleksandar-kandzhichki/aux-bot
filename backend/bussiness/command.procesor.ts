import { Command, CommandParams, CommandNames } from "../appInterfaces/Command";
import { ICommandProcessor } from "../appInterfaces/ICommandProcessor";
import { commandsInfo } from "../config/commands.info";

export class CommandProcessor implements  ICommandProcessor {

    constructor() {}

    executeCommand(command: Command) {
        switch(command.name) {
            case CommandNames.summary: return this.executeSummaryCommand(command.params);
            case CommandNames.lunchFromImage: return this.executeLuchByImageCommand(command.params);
            case CommandNames.help: return this.executeHelpCommand(command.params);
            default: throw new Error("Unsupported command");
        }
    }

    executeSummaryCommand(params?: CommandParams) {
        return Promise.reject(params);
    }

    executeLuchByImageCommand(params?: CommandParams) {
        return Promise.reject(params);
    }

    executeHelpCommand(params?: CommandParams) {
        const allCommands = Object.values(CommandNames);
        const helpCommands = !params || !Object.keys(params).length? allCommands: allCommands.filter(command => !!params[command]);
        const helpText = helpCommands.reduce((prev, cur) => {
            const info = commandsInfo[cur];
            if(!info) return prev;
            return `${prev}
            The purpose for this command is ${info.purpose}
            The examples for ${info.name} command are:
            ${JSON.stringify(info.examples)}.
            ` 
        },"The following text shows the usage of the supported commands:\n" )
        return helpText;
    }


}