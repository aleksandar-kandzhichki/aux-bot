import { CommandNames } from "../appInterfaces/Command";

export interface ICommandInformation {
    name: CommandNames,
    purpose: string,
    examples: string[],
    params: { name: string, usage: string }[]
}

export const commandsInfo: { [key in CommandNames]?: ICommandInformation} = {

    [CommandNames.summary]: {
        name: CommandNames.summary,
        purpose: "to summarize lunch orders",
        examples: ["!summary", "!summary -restaurant prado"],
        params: [{
            name: "restaurant",
            usage: "The param followed by it specifies the restaurant from which you would want the summary from."
        }]
    },

    [CommandNames.help]: {
        name: CommandNames.help,
        purpose: "to provide info about the supported commands",
        examples: ["!help", "!help -summary"],
        params: [{
            name: "the name of the command you wish to get info for",
            usage: ""
        }]
    },

    [CommandNames.createPollFromURL]: {
        name: CommandNames.createPollFromURL,
        purpose: "to create a poll with the food from the specified link (For now only foodpanda and takeaway links are supported!",
        examples: ["!createPollFromURL -url https://www.foodpanda.bg/restaurant/v7od/ola-taste-of-med#reorder"],
        params: [{
            name: "url",
            usage: "the url you wish to get a poll for"
        }]
    },

}