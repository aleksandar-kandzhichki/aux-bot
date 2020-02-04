
export interface PollOption {
    name: string;
    voteOptions: string[];
    votes: Object[];
    messageId: string;
}

export type PollOptions = { [optionName: string]: PollOption };

export interface BotPolls {
    /** Creates a poll, returns messageIds of the poll's messages */
    createPoll(options: PollOptions): Promise<string[]>;

    summarize(startMessage: string, endMessage: string, voteOptions: string[]): Object[];
    reset(startMessage: string, endMessage: string, voteOptions: string[]): Promise<void>;
}