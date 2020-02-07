import { IURLConfig } from "../../appInterfaces/SupportedURLs";
import mongoose from 'mongoose';
require('mongoose-regexp')(mongoose);

const schema = new mongoose.Schema({
    name: { type: String, maxlength: 50 },
    urlKeyword: { type: String, maxlength: 30 },
    config: {
        foodRegex: RegExp,
        priceRegex: RegExp,
        restaurantNameRegex: RegExp,
    }
});

export interface IURLInfoMongoModel extends IURLConfig, mongoose.Document { }
const urlInfoModel = mongoose.model<IURLInfoMongoModel>('url-info', schema);

export default urlInfoModel;