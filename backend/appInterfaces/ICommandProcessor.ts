import { Command, CommandParams } from "./Command";
import { URLMealInfo } from "./SupportedURLs";

export interface ICommandProcessor {

    executeCommand(command: Command): any;
    parseURLFoodData(_params?: CommandParams): Promise<URLMealInfo>;
    executeHelpCommand(params?: CommandParams): string;
}