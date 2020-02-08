import { BotPolls, PollOptions, PollResult } from "../appInterfaces/Polls";
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

    async summarize(startMessage: string, endMessage: string, channel: DiscordChannel | undefined = this.defaultChannel): Promise<PollResult> {
        this.history;
        this.client;
        startMessage;
        endMessage;

        let messages = await this.history.getBetweenIds(startMessage, endMessage, channel);
        let processed: PollResult = messages.reduce((acc, cur) => {
            const reactionsObj = cur.reactions.reduce((acc, reaction) => {
                acc[reaction.emoji.name] = reaction.count
                return acc;
            }, {} as { [reactionName: string]: number })
            acc[cur.content] = reactionsObj;
            return acc;
        }, {} as PollResult)
        return processed;
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