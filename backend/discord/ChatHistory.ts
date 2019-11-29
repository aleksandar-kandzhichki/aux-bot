import { ChatHistory } from '../appInterfaces/ChatHistory';
import { Client } from 'discord.js';
import { Message } from "discord.js";
import { DiscordChannel } from './types/DiscordChannel';

export class DiscordChatHistory implements ChatHistory {
    constructor(private clinet: Client) {
        console.log(this.clinet);
    }

    async getLastN(n: number, channel?: DiscordChannel): Promise<Message[]> {
        if (!!channel) return channel.fetchMessages({ limit: n }).then(m => m.array());
        return [];
    }
    getUntilId(id: string): Promise<Message[]> {
        console.log(id);
        throw new Error("Method not implemented.");
    }
    async getByDate(date: Date = new Date(), channel?: DiscordChannel): Promise<Message[]> {
        console.log(date);
        if (!!channel) return channel.fetchMessages().then(m => m.array().filter(el => this.isSameDay(el.createdAt, date)))
        return [];
    }

    private isSameDay(d1: Date, d2: Date) {
        return d1.getDate() == d2.getDate() && d1.getMonth() == d2.getMonth() && d1.getFullYear() == d2.getFullYear()
    }
}