import { mongoConnect } from "../dbConnection"
import defaultScheduledMessagesStorage from "../storage/scheduled-message.storage";
import { IScheduledMessage, TimeStatus } from "../appInterfaces/IScheduledMessage";

(async () => {
    await mongoConnect();
    let messages = [
        {
            channel: "lala",
            hour: 12,
            minute: 0,
            message: "TRalalalalala",
            timeStatus: TimeStatus.PM,
        },
    ] as IScheduledMessage[];
    for (let message of messages) {
        await defaultScheduledMessagesStorage.addNewScheduledMessage(message);
        console.log(`added message with name - ${message.message}!`)
    }
    process.exit();
})();