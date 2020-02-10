import { CommandNames } from "../appInterfaces/Command";

export function levensteinDistance(firstString: string, secondString: string) {
    const distanceTable: number[][] = Array(firstString.length + 1).fill(null).map(_ => Array(secondString.length + 1).fill(0));
    for (let i = 0; i < firstString.length + 1; i++) {
        distanceTable[i][0] = i;
    }
    for (let i = 0; i < secondString.length + 1; i++) {
        distanceTable[0][i] = i;
    }

    for (let i = 1; i < firstString.length + 1; i++) {
        for (let j = 1; j < secondString.length + 1; j++) {
            distanceTable[i][j] = Math.min(
                distanceTable[i][j - 1] + 1,
                distanceTable[i - 1][j] + 1,
                distanceTable[i - 1][j - 1] + ((firstString[i - 1] == secondString[j - 1]) ? 0 : 1)
            )
        }
    }
    return distanceTable[firstString.length][secondString.length];
}

export function getLowestDistanceCommandsFromString(str: string) {
    const toExclude = [CommandNames.ignore, CommandNames.test, CommandNames.unknown, CommandNames.test2];
    let commands = Object.values(CommandNames).filter(command => !toExclude.includes(command));
    let maxEdits = Math.floor(str.length / 3);
    let possibleCommands = commands.filter(command => levensteinDistance(str, command) <= maxEdits);
    return possibleCommands;
}