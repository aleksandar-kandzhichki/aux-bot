import { CommandParams } from "./Command";
import { URLMealInfo } from "./IURLsConfig";

export interface ICommandProcessor {

    parseURLFoodData(_params?: CommandParams): Promise<URLMealInfo>;
    executeHelpCommand(params?: CommandParams): Promise<string>;
}