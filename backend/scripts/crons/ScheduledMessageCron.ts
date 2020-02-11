import { CronJob } from "cron"
import defaultScheduledMessageStorage, { IScheduledMessageStorage } from "../../storage/scheduled-message.storage";
import auth from '../../auth.json';
import Discord, { TextChannel } from 'discord.js';
import { mongoConnect } from "../../dbConnection";
import { ScheduledMessage } from "../../appInterfaces/IScheduledMessage";

const interval = 5;
export class ScheduledMessageCron {

    constructor(private scheduledMessageStorage: IScheduledMessageStorage = defaultScheduledMessageStorage) {
        this.client = new Discord.Client();
        this.client.login(auth.token);
        this.cron = new CronJob(`0 */${interval} * * * *`, async () => await this.extractMessagesAndSendThem(), undefined, true);
        this.client.on('ready', async () => {
            mongoConnect().then(this.cron.start);
        })
    }

    cron: CronJob;
    client: Discord.Client;

    async extractMessagesAndSendThem() {
        let messages = await this.scheduledMessageStorage.getAllMessages();
        const now = new Date();
        messages = messages.filter(message => (message.hour == now.getHours() && message.minute < now.getMinutes() && message.minute >= now.getMinutes() - interval) ||
            ((message.hour = now.getHours() - 1) && message.minute >= now.getMinutes() + 60 - interval));
        messages = messages.filter(message => new ScheduledMessage(message).activatedDays.includes(now.getDay()));
        for (let messageInfo of messages) {
            const channel = this.client.channels.array().find(channel => messageInfo.channel == (channel as TextChannel).name) as (TextChannel | undefined);
            if (!channel) {
                console.log(`No such channel - ${messageInfo.channel}!`);
                continue;
            }
            await channel.sendMessage(messageInfo.message);
        }
    }
}

const defaultCron = new ScheduledMessageCron();
export default defaultCron;