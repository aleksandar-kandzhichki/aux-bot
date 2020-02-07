import { Model } from "mongoose";
import defaultScheduledMessageModel, { IScheduledMessagesMongoModel } from "./models/scheduled-message.model";
import { IScheduledMessage } from "../appInterfaces/IScheduledMessage";

export interface IScheduledMessageStorage {
    addNewScheduledMessage(data: IScheduledMessage): Promise<void>;
    //getAllInTimeFrame(hour: number, minutes: number, timeStat: TimeStatus, interval: number): Promise<IScheduledMessage[]>;
    updateMessageById(data: IScheduledMessage): Promise<void>;
    getAllMessages(): Promise<IScheduledMessage[]>;
}

export class ScheduledMessageStorage implements IScheduledMessageStorage {
    constructor(private scheduledMessageModel: Model<IScheduledMessagesMongoModel> = defaultScheduledMessageModel) { }

    async addNewScheduledMessage(data: IScheduledMessage): Promise<void> {
        await this.scheduledMessageModel.create(data);
    }

    getAllMessages(): Promise<IScheduledMessage[]> {
        return this.scheduledMessageModel.find({}).lean().exec();
    }

    // getAllInTimeFrame(hour: number, minutes: number, timeStat: TimeStatus, interval: number): Promise<IScheduledMessage[]> {
    //     return this.scheduledMessageModel.find({}).lean().exec();
    // }


    updateMessageById(data: IScheduledMessage): Promise<void> {
        return this.scheduledMessageModel.updateOne({ _id: data._id }, { $set: data }).exec();
    }
}

const defaultScheduledMessageStorage = new ScheduledMessageStorage();
export default defaultScheduledMessageStorage;