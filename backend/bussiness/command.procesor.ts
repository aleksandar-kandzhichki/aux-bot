import { Command, CommandParams, CommandNames } from "../appInterfaces/Command";
import { ICommandProcessor } from "../appInterfaces/ICommandProcessor";
import { commandsInfo } from "../config/commands.info";
import defaultExternalUrlModule, { IExternalURLsModule } from "./web/external-urls.module";
import { readFileSync, unlink, ensureDirSync } from "fs-extra";
import { SupportedURLs, URLsConfig } from "../appInterfaces/SupportedURLs";
import { join } from 'path';
export class CommandProcessor implements  ICommandProcessor {
    tempFolderName: string;

    constructor(
        private externalURlModule: IExternalURLsModule = defaultExternalUrlModule,
        ) {
            this.tempFolderName = "temps";
            ensureDirSync(this.tempFolderName);
    }

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
       let matchedUrl = this.matchURL(_params.url);
       let tempFilePath = join(this.tempFolderName, `${matchedUrl}__${new Date().toDateString()}.html`);
       await this.externalURlModule.getTemplateFromURL(_params.url, tempFilePath);
       const template = readFileSync(tempFilePath).toString();
       unlink(tempFilePath);
       let meals = this.matchElementsFromTemplate(template, matchedUrl);
       let restaurantName = URLsConfig[matchedUrl].extractRestaurantName(template);
       return { meals, restaurantName };
    }

    matchURL(url: string) {
        let supportedUrls = Object.values(SupportedURLs);
        let mappedUrl = supportedUrls.find(elem => url.includes(elem));
        if (!mappedUrl) throw new Error("Unsupported url!");
        return mappedUrl;
    }

    matchElementsFromTemplate(template: string, url: SupportedURLs) {
        const config = URLsConfig[url];
        const names = template.match(config.foodRegex)?.map(config.extractFoodGroup);
        if (url == SupportedURLs.FoodPanda) names?.pop();
        const prices = template.match(config.priceRegex)?.map(config.extractPrice);
        if(!names || !prices) throw new Error("No meals for this link!");
        return names.map((name, index) => `${name}   ${prices[index]}`);
    }

    executeHelpCommand(params?: CommandParams) {
        const allCommands = Object.values(CommandNames);
        const helpCommands = !params || !Object.keys(params).length? allCommands: allCommands.filter(command => !!Object.keys(params).includes(command));
        const helpText = helpCommands.reduce((prev, cur) => {
            const info = commandsInfo[cur];
            if(!info) return prev;
            return `${prev}
            The purpose for the command - ${info.name} is ${info.purpose}
            The examples for ${info.name} command are:
            ${JSON.stringify(info.examples)}.
            ` 
        },"The following text shows the usage of the supported commands:\n" )
        return helpText;
    }


}