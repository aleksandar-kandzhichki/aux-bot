import { Command, CommandParams } from "./Command";
import { URLMealInfo } from "./IURLsConfig";

export interface ICommandProcessor {

    executeCommand(command: Command): any;
    parseURLFoodData(_params?: CommandParams): Promise<URLMealInfo>;
    executeHelpCommand(params?: CommandParams): Promise<string>;
}