export class Command {
    issuer: any;
    name: CommandNames;
    params: CommandParams;
    channel: any;

    constructor(other: Command) {
        this.issuer = other.issuer;
        this.name = other.name;
        this.params = other.params;
        this.channel = other.channel;
    }

    static Command(issuer: any, name: any, params: CommandParams, channel: any) {
        return new Command({ issuer, name, params, channel })
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
    lunchFromImage = "fromimage",
    ignore = "ignore",
    unknown = "unknown",
    test = "test",
    test2 = "proba"
}
export interface CommandParams {
    [param: string]: string | true;
}