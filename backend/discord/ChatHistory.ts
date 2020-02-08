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

    /** Gets all messages between firstId and lastId in historical order - firstId was sent first */
    getBetweenIds(firstId: string, lastId: string, channel?: DiscordChannel): Promise<Message[]> {
        if (!!channel) return channel.fetchMessages({ after: firstId }).then(m => {
            let arr = m.array().reverse(); // first message in history comes last here, last message in history is with index 0 -_-
            let lastIndex = arr.findIndex(m => m.id == lastId);
            if (lastIndex == -1) return arr; // this should fetch more messages!!!;
            return arr.splice(0, lastIndex);
        })
        return Promise.resolve([]);
    }

    getByDate(date: Date = new Date(), channel?: DiscordChannel): Promise<Message[]> {
        console.log(date);
        if (!!channel) return channel.fetchMessages().then(m => m.array().filter(el => this.isSameDay(el.createdAt, date)))
        return Promise.resolve([]);
    }

    private isSameDay(d1: Date, d2: Date) {
        return d1.getDate() == d2.getDate() && d1.getMonth() == d2.getMonth() && d1.getFullYear() == d2.getFullYear()
    }
}