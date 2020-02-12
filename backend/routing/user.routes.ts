import * as express from 'express';
import defaultAuthProcessor from '../business/auth.processor';
import AppBot from '../bot';
import { Command, CommandNames } from '../appInterfaces/Command';
import AppClient from '../discord/DiscordClient';
import { TextChannel } from 'discord.js';

const router = express.Router();

router.post('/api/users/login', (req, res) => {
    try {
        const authToken = defaultAuthProcessor.validateLogin(req.body.password);
        res.json(authToken);
    } catch (err) {
        res.status(401).send({ message: err.message });
    };

});

router.get('/api/commands/summarize/:from', async (req, res) => {
    try {
        const resp = AppBot.runCommand(
            new Command({
                name: CommandNames.summary,
                issuer: AppBot.botClientId,
                params: { from: req.params.from },
                channel: AppClient.channels.array().find(channel => 'bot-testing' == (channel as TextChannel).name) as (TextChannel),
                rawInvocation: `!summarize -from ${req.params.from}`
            }))
        let r = await resp[0];
        res.json(r);
    } catch (err) {
        res.status(401).send({ message: err.message });
    };

});

export default router;