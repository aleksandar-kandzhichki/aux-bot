import { Schema, model, Document } from "mongoose";
import { TimeStatus, IScheduledMessage } from "../../appInterfaces/IScheduledMessage";


const schema = new Schema({
    channel: { type: String, maxlength: 50 },
    hour: { type: Number, min: 0, max: 12 },
    minute: { type: Number, min: 0, max: 59 },
    message: String,
    timeStatus: { type: String, enum: Object.values(TimeStatus) },
});

export interface IScheduledMessagesMongoModel extends IScheduledMessage, Document { }
const defaultScheduledMessageModel = model<IScheduledMessagesMongoModel>('scheduled-messages', schema);

export default defaultScheduledMessageModel;