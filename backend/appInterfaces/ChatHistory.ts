import { Message } from "discord.js";

export interface ChatHistory {
    getLastN(n: number, channel?: any): Promise<Message[]>;
    getUntilId(id: string): Promise<Message[]>;
    getBetweenIds(firstId: string, lastId: string, channel?: any): Promise<Message[]>;
    getByDate(date?: Date): Promise<Message[]>;
}