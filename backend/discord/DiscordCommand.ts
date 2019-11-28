import { Command } from "../appInterfaces/Command";
import { GroupDMChannel, DMChannel, TextChannel } from "discord.js";

export type DiscordChannels = TextChannel | DMChannel | GroupDMChannel;

export class DiscordCommand extends Command {
    channel: DiscordChannels

    constructor(other: DiscordCommand) {
        super(other);
        this.channel = other.channel;
    }
}