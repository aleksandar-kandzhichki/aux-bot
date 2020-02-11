import { WeekDay, weekDays } from "./WeekDays";

export interface IScheduledMessage {
    _id: any,
    channel: string,
    hour: number,
    minute: number,
    message: string,
    activatedDays?: WeekDay[],
}

export class ScheduledMessage implements IScheduledMessage {
    _id: any;
    channel: string;
    hour: number;
    minute: number;
    message: string;
    activatedDays: WeekDay[];

    constructor(message: IScheduledMessage) {
        this._id = message._id;
        this.channel = message.channel;
        if (message.hour < 0 || message.hour > 23 || !Number.isInteger(message.hour)) throw new Error("Invalid hour!");
        this.hour = message.hour;
        if (message.minute < 0 || message.minute > 59 || !Number.isInteger(message.minute)) throw new Error("Invalid minutes!");
        this.minute = message.minute;
        if (!message.message) throw new Error("Empty message!");
        this.message = message.message;
        if (message.activatedDays && message.activatedDays.some(day => day < 0 || day > 6 || !Number.isInteger(day))) throw new Error("Invalid activated days!");
        this.activatedDays = message.activatedDays || weekDays;
    }
}