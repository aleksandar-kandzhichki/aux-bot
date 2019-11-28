import { ChatHistory } from '../appInterfaces/ChatHistory';
import { Client } from 'discord.js';
import { Message } from "discord.js";
import { DiscordChannel } from './types/DiscordChannel';

export class DiscordChatHistory implements ChatHistory {
    constructor(private clinet: Client) {
        console.log(this.clinet);
    }

    getLastN(n: number, channel?: DiscordChannel): Promise<Message[]> {
        // if(channel) channel.fetchMessages()
        console.log(n, channel);
        throw new Error("Method not implemented.");
    }
    getUntilId(id: string): Promise<Message[]> {
        console.log(id);
        throw new Error("Method not implemented.");
    }
    async getByDate(date?: Date | undefined, channel?: DiscordChannel): Promise<Message[]> {
        console.log(date);
        if (!!channel) return channel.fetchMessages().then(m => m.array())
        return [];
    }


}