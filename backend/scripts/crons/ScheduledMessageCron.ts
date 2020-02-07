import { CronJob } from "cron"
import defaultScheduledMessageStorage, { IScheduledMessageStorage } from "../../storage/scheduled-message.storage";
import auth from '../../auth.json';
import Discord, { TextChannel } from 'discord.js';
import { mongoConnect } from "../../dbConnection";

//0 */10 * * * *
export class ScheduledMessageCron {

    constructor(private scheduledMessageStorage: IScheduledMessageStorage = defaultScheduledMessageStorage) {
        this.client = new Discord.Client();
        this.client.login(auth.token);
        this.cron = new CronJob('* * * * * *', async () => await this.extractMessagesAndSendThem(), undefined, true);
        this.client.on('ready', async () => {
            mongoConnect().then(this.cron.start);
        })
    }

    cron: CronJob;
    client: Discord.Client;

    async extractMessagesAndSendThem() {
        const messages = await this.scheduledMessageStorage.getAllMessages();
        for (let messageInfo of messages) {
            //const guild = this.client.guilds.find(el => el.name == messageInfo.channel);
            //console.log(guild);
            const channel = this.client.channels.get(messageInfo.channel);
            console.log(channel);
            if (!channel || !(channel instanceof TextChannel)) throw new Error(`No channel for message - ${messageInfo.channel}`);
            if (!(channel instanceof TextChannel)) throw new Error(`Channel - ${messageInfo.channel} is not a text channel`);
            await channel.sendMessage(messageInfo.message);
        }
    }
}

const defaultCron = new ScheduledMessageCron();
export default defaultCron;