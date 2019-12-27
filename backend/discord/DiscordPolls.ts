import { BotPolls, PollOptions } from "../appInterfaces/Polls";
import { ChatHistory } from "../appInterfaces/ChatHistory";
import { Client, Message } from "discord.js";
import { DiscordChannel } from "./types/DiscordChannel";

export class DiscrodPolls implements BotPolls {

    defaultChannel?: DiscordChannel;

    constructor(
        private history: ChatHistory,
        private client: Client
    ) {

    }

    async createPoll(options: PollOptions, channel: DiscordChannel | undefined = this.defaultChannel): Promise<string[]> {
        if (!channel) throw new Error("Could not determine channel for poll start");

        channel.send("### Creating poll! ###\n");

        let messageIds = [];
        for (let option of Object.values(options)) {
            let message = await channel.send(option.name) as Message;
            for (let voteOption of option.voteOptions) {
                message.react(voteOption);
            }
            messageIds.push(message.id);
        }

        return messageIds;
    }

    summarize(startMessage: string, endMessage: string, voteOptions: string[]): Object[] {
        this.history;
        this.client;
        startMessage;
        endMessage;
        voteOptions;
        throw new Error("Method not implemented.");
        // return [];
    }

    async reset(startMessageId: string, endMessageId: string, voteOptions: string[], channel: DiscordChannel | undefined = this.defaultChannel) {
        if (!channel) throw new Error("Could not determine channel to reset poll at");
        voteOptions;

        await channel.messages.get(startMessageId)?.clearReactions();
        await channel.messages.get(endMessageId)?.clearReactions();
        return;
    }


}