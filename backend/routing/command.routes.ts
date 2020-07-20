import * as express from 'express';
import { Command, CommandNames } from '../appInterfaces/Command';
import AppBot from '../bot';
import defaultCommandInfoStorage from '../storage/command-info.storage';
import { wrap } from './wrapper';
import AppClient from '../discord/DiscordClient';
import { TextChannel } from 'discord.js';

const router = express.Router();


router.get('/api/commands/:commandName/actions/:actionName', wrap(async (req, res) => {
    const data = await defaultCommandInfoStorage.getCommand(req.params.commandName, req.params.actionName);
    res.json(data);
}));


router.post('/api/commands/:commandName/actions/run', wrap(async (req, res) => {
    const commandName = req.params.commandName as CommandNames;
    if (!Object.values(CommandNames).includes(commandName)) throw new Error(`Unknown Command ${commandName}`)

    const channelName = req.body.channelName;
    const channel = AppClient.channels.array().find(channel => channelName == (channel as TextChannel).name) as (TextChannel)
    await AppBot.runCommand(new Command({ channel, issuer: "APP USER", name: commandName, params: req.body, rawInvocation: "ran from app form" }))[0]
    res.json(200);
}));

export default router;