import { Schema, model, Document } from "mongoose";
import { IScheduledMessage } from "../../appInterfaces/IScheduledMessage";
import { weekDays } from "../../appInterfaces/WeekDays";


const schema = new Schema({
    channel: { type: String, maxlength: 50 },
    hour: { type: Number, min: 0, max: 23 },
    minute: { type: Number, min: 0, max: 59 },
    message: String,
    activatedDays: { type: [Number], default: weekDays }
});

export interface IScheduledMessagesMongoModel extends IScheduledMessage, Document { }
const defaultScheduledMessageModel = model<IScheduledMessagesMongoModel>('scheduled-messages', schema);

export default defaultScheduledMessageModel;