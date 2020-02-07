import { Command, CommandParams, CommandNames } from "../appInterfaces/Command";
import { ICommandProcessor } from "../appInterfaces/ICommandProcessor";
import defaultExternalUrlModule, { IExternalURLsModule } from "./web/external-urls.module";
import { readFileSync, ensureDirSync, unlink } from "fs-extra";
import { URLMealInfo, IURLConfig } from "../appInterfaces/SupportedURLs";
import { join } from 'path';
import defaultCommandInfoStorage, { ICommandInfoStorage } from "../storage/command-info.storage";
import defaultURLInfoStorage, { IURLInfoStorage } from "../storage/url-info.storage";
export class CommandProcessor implements ICommandProcessor {
    tempFolderName: string;

    constructor(
        private externalURlModule: IExternalURLsModule = defaultExternalUrlModule,
        private commandsInfoStorage: ICommandInfoStorage = defaultCommandInfoStorage,
        private urlInfoStorage: IURLInfoStorage = defaultURLInfoStorage,
    ) {
        this.tempFolderName = "temps";
        ensureDirSync(this.tempFolderName);
    }

    executeCommand(command: Command) {
        switch (command.name) {
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
        if (!_params || typeof _params.url != 'string')
            throw new Error(`Please provide a url! For more information see !help -${CommandNames.createPollFromURL}!`);
        const matchedUrl = await this.matchURL(_params.url);
        let tempFilePath = join(this.tempFolderName, `${matchedUrl.name}__${new Date().toDateString()}.html`);
        await this.externalURlModule.getTemplateFromURL(_params.url, tempFilePath);
        const template = readFileSync(tempFilePath).toString();
        await unlink(tempFilePath);
        let meals = this.matchElementsFromTemplate(template, matchedUrl);
        return meals;
    }

    async matchURL(url: string) {
        let supportedUrls = await this.urlInfoStorage.getAllURLInfo();
        let mappedUrl = supportedUrls.find(elem => url.includes(elem.urlKeyword));
        if (!mappedUrl) throw new Error("Unsupported url!");
        return mappedUrl;
    }

    matchElementsFromTemplate(template: string, urlConfig: IURLConfig) {
        const config = urlConfig.config;
        const restaurantName = config.restaurantNameRegex.exec(template);
        if (!restaurantName) throw "No name for the restaurant!";
        const result: URLMealInfo = { meals: [], restaurantName: restaurantName[1] };
        let foodName = config.foodRegex.exec(template);
        let price = config.priceRegex.exec(template);
        while (!!foodName && !!price) {
            result.meals.push({ mealName: foodName[1].replace(/\s{2,}/g, ''), mealPrice: price[1].replace(/\s{2,}/g, '') });
            foodName = config.foodRegex.exec(template);
            price = config.priceRegex.exec(template);
        }
        return result;
    }

    async executeHelpCommand(params?: CommandParams) {
        const helpCommands = (!!params && !!Object.keys(params).length ? Object.keys(params) : Object.values(CommandNames)) as CommandNames[];
        const commandsInformation = await this.commandsInfoStorage.findCommandInfoByNames(helpCommands);
        const helpText = commandsInformation.reduce((prev, cur) => {
            if (!cur) return prev;
            return `${prev}
            The purpose for the command - ${cur.name} is ${cur.purpose}
            The examples for ${cur.name} command are:
            ${JSON.stringify(cur.examples)}.
            `
        }, "The following text shows the usage of the supported commands:\n")
        return helpText;
    }

}