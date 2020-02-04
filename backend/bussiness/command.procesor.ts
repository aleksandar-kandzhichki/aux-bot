import { Command, CommandParams, CommandNames } from "../appInterfaces/Command";
import { ICommandProcessor } from "../appInterfaces/ICommandProcessor";
import { commandsInfo } from "../config/commands.info";
import defaultExternalUrlModule, { IExternalURLsModule } from "./web/external-urls.module";
import { unlink, readFileSync } from "fs-extra";

export class CommandProcessor implements  ICommandProcessor {

    constructor(
        private externalURlModule: IExternalURLsModule = defaultExternalUrlModule,
        ) {}

    executeCommand(command: Command) {
        switch(command.name) {
            case CommandNames.summary: return this.executeSummaryCommand(command.params);
            case CommandNames.createPollFromURL: return this.parseURLFoodData(command.params);
            case CommandNames.help: return this.executeHelpCommand(command.params);
            default: throw new Error("Unsupported command");
        }
    }

    executeSummaryCommand(params?: CommandParams) {
        return Promise.reject(params);
    }

   async parseURLFoodData(_params?: CommandParams) {
        if(!_params || typeof _params.url !=  'string') 
            throw new Error(`Please provide a url! For more information see !help -${CommandNames.createPollFromURL}!`);
       await this.externalURlModule.getTemplateFromURL(_params.url, "./test.html");
       const template = readFileSync("./test.html").toString();
       unlink("./test.html");
       if(_params.url.includes("takeaway")) return this.matchElementsFromTemplate(template, "data-product-name");
       throw new Error("Unsupported url!")
    }

    matchElementsFromTemplate(template: string, attribute: string) {
        const str = `${attribute}="(.*?)"`;
        const regex = new RegExp(str, "g");
        return regex.exec(template);
        //return template.match(regex)?.map(el => el.);
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