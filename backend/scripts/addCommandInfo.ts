import { mongoConnect } from "../dbConnection"
import defaultCommandInfoStorage from "../storage/command-info.storage";
import { ICommandInformation, commandsInfo } from "../config/commands.info";

(async () => {
    await mongoConnect();
    const commandsInformation = Object.values(commandsInfo) as ICommandInformation[];
    let result = await defaultCommandInfoStorage.addNewCommands(commandsInformation);
    console.log(`added info for commands - ${result}`)
    process.exit();
})();