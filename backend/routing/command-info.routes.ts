import * as express from 'express';
import defaultCommandInfoStorage from '../storage/command-info.storage';
import { authenticate } from './auth-middleware';
import { wrap } from './wrapper';

const router = express.Router();


router.post('/api/command-info/add', authenticate, wrap(async (req, res) => {
    await defaultCommandInfoStorage.addNewCommands(req.body.commands);
    res.sendStatus(201);
}));

router.get('/api/command-info/commands', authenticate, wrap(async (_req, res) => {
    const commandInfo = await defaultCommandInfoStorage.getAllCommands();
    res.json(commandInfo);
}));

router.put('/api/command-info/command', authenticate, wrap(async (_req, res) => {
    await defaultCommandInfoStorage.updateCommandInfo(_req.body.command);
    res.sendStatus(204);
}));

export default router;