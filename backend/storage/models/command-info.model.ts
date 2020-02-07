import { Schema, model, Document } from "mongoose";
import { ICommandInformation } from "../../config/commands.info";
import { CommandNames } from "../../appInterfaces/Command";

const schema = new Schema({
    name: { type: String, enum: Object.values(CommandNames) },
    purpose: String,
    examples: [String],
    params: [{ name: { type: String, maxlength: 50 }, usage: String }]
});

export interface ICommandInformationMongoModel extends ICommandInformation, Document { }
var Model = model<ICommandInformationMongoModel>('commands-info', schema);

export default Model;