import { mongoConnect } from "../dbConnection"
import defaultScheduledMessagesStorage from "../storage/scheduled-message.storage";
import { IScheduledMessage } from "../appInterfaces/IScheduledMessage";

(async () => {
    await mongoConnect();
    let messages = [
        {
            channel: "bot-testing",
            hour: 12,
            minute: 0,
            message: "TRalalalalala12",
        },
        {
            channel: "bot-testing",
            hour: 13,
            minute: 42,
            message: "TRalalalalala",
        },
        {
            channel: "bot-testing",
            hour: 13,
            minute: 56,
            message: "TRalalalalala",
        },
        {
            channel: "bot-testing",
            hour: 14,
            minute: 2,
            message: "TRalalalalala",
        },
    ] as IScheduledMessage[];
    for (let message of messages) {
        await defaultScheduledMessagesStorage.addNewScheduledMessage(message);
        console.log(`added message with name - ${message.message}!`)
    }
    process.exit();
})();