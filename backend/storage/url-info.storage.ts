import { Model } from "mongoose";
import defaultURLInfoModel, { IURLInfoMongoModel } from "./models/url-info.model";
import { IURLConfig } from "../appInterfaces/SupportedURLs";

export interface IURLInfoStorage {
    addNewURL(url: IURLConfig): Promise<void>;
    findURLInfoByName(name: string): Promise<IURLConfig>;
    updateCommandInfo(url: IURLConfig): Promise<void>;
    getAllURLInfo(): Promise<IURLConfig[]>;
}

export class URLInfoStorage implements IURLInfoStorage {
    constructor(private urlInfoModel: Model<IURLInfoMongoModel> = defaultURLInfoModel) { }

    async addNewURL(url: IURLConfig): Promise<void> {
        const existingConfig = await this.findURLInfoByName(url.name);
        if (!!existingConfig) throw new Error(`URL config already exists for url with name - ${url.name}!`);
        await this.urlInfoModel.create(url);
    }

    getAllURLInfo(): Promise<IURLConfig[]> {
        return this.urlInfoModel.find({}).lean().exec();
    }

    findURLInfoByName(name: string): Promise<IURLConfig> {
        return this.urlInfoModel.findOne({ name }).lean().exec();
    }

    updateCommandInfo(url: IURLConfig): Promise<void> {
        return this.urlInfoModel.updateOne({ name: url.name }, { $set: url }).exec();
    }
}

const defaultURLInfoStorage = new URLInfoStorage();
export default defaultURLInfoStorage;