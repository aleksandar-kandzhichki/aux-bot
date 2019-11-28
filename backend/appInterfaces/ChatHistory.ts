import { Message } from "discord.js";

export interface ChatHistory {
    getLastN(n: number): Promise<Message[]>;
    getUntilId(id: string): Promise<Message[]>;
    getByDate(date?: Date): Promise<Message[]>;
}