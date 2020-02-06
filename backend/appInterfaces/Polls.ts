
export interface PollOption {
    name: string;
    voteOptions: string[];
    votes: Object[];
    messageId: string;
}

export type PollOptions = { [optionName: string]: PollOption };

export type OptionResultReactions = { [reactionName: string]: number };
export type PollResult = { [optionName: string]: OptionResultReactions }

export interface BotPolls {
    /** Creates a poll, returns messageIds of the poll's messages */
    createPoll(options: PollOptions): Promise<string[]>;

    summarize(startMessage: string, endMessage: string): Promise<PollResult>;
    reset(startMessage: string, endMessage: string, voteOptions: string[]): Promise<void>;
}