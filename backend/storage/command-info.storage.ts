import defaultCommandInfoModel, { ICommandInformationMongoModel } from "./models/command-info.model";
import { ICommandInformation } from "../config/commands.info";
import { Model } from "mongoose";
import { CommandNames } from "../appInterfaces/Command";

export interface ICommandInfoStorage {
    addNewCommands(commandsInfo: ICommandInformation[]): Promise<ICommandInformation[]>;
    findCommandInfoByNames(names: CommandNames[]): Promise<ICommandInformation[]>;
    updateCommandInfo(commandInfo: ICommandInformation): Promise<void>
}

export class CommandInfoStorage implements ICommandInfoStorage {
    constructor(private commandInfoModel: Model<ICommandInformationMongoModel> = defaultCommandInfoModel) {}

    async addNewCommands(commandsInfo: ICommandInformation[]): Promise<ICommandInformation[]> {
        const existingCommands = await (await this.findCommandInfoByNames(commandsInfo.map((info) => info.name))).map(info => info.name);
        commandsInfo = commandsInfo.filter(info => !existingCommands.includes(info.name));
        return this.commandInfoModel.insertMany(commandsInfo);
    }

    findCommandInfoByNames(names: CommandNames[]): Promise<ICommandInformation[]> {
        return this.commandInfoModel.find({ name: { $in: names } }).lean().exec();
    }

    updateCommandInfo(commandInfo: ICommandInformation): Promise<void> {
        return this.commandInfoModel.updateOne({ name: commandInfo.name }, { $set: commandInfo }).exec();
    }
}

const defaultCommandInfoStorage = new CommandInfoStorage();
export default defaultCommandInfoStorage;