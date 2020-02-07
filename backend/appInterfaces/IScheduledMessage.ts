export enum TimeStatus {
    AM = "am",
    PM = "pm",
}

export interface IScheduledMessage {
    _id: any,
    channel: string,
    hour: number,
    minute: number,
    message: string,
    timeStatus: TimeStatus,
}