import { DiscordChannel } from "../discord/types/DiscordChannel";

export class Command {
    issuer: any;
    name: CommandNames;
    params: CommandParams;
    channel: DiscordChannel;
    rawInvocation: string;

    constructor(other: Command) {
        this.issuer = other.issuer;
        this.name = other.name;
        this.params = other.params;
        this.channel = other.channel;
        this.rawInvocation = other.rawInvocation;
    }

    static Command(issuer: any, name: any, params: CommandParams, channel: any, rawInvocation: string) {
        return new Command({ issuer, name, params, channel, rawInvocation })
    }
}

export class UnknownCommand extends Command {
    constructor(other: UnknownCommand) {
        super(other);
        this.name = CommandNames.unknown;
    }
}

export enum CommandNames {
    summarizePoll = "summarizePoll",
    summary = "summary",
    lunch = "lunch",
    ignore = "ignore",
    unknown = "unknown",
    help = "help",
    test = "test",
    test2 = "proba",
    createPollFromURL = "createPollFromURL",
    poll = "poll"
}
export interface CommandParams {
    [param: string]: string | true;
}