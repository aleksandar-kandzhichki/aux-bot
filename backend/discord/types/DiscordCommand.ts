import { Command } from "../../appInterfaces/Command";
import { DiscordChannel } from "./DiscordChannel";

export class DiscordCommand extends Command {
    channel: DiscordChannel

    constructor(other: DiscordCommand) {
        super(other);
        this.channel = other.channel;
    }
}