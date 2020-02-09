import * as express from 'express';
import defaultCommandInfoStorage from '../storage/command-info.storage';
import { wrapper } from './wrapper';

const router = express.Router();


router.post('/api/command-info/add', wrapper(async (req, res) => {
    await defaultCommandInfoStorage.addNewCommands(req.body.commands);
    res.sendStatus(201);
}));

router.get('/api/command-info/commands', wrapper(async (_req, res) => {
    const commandInfo = await defaultCommandInfoStorage.getAllCommands();
    res.json(commandInfo);
}));

router.put('/api/command-info/command', wrapper(async (_req, res) => {
    await defaultCommandInfoStorage.updateCommandInfo(_req.body.command);
    res.sendStatus(201);
}));

export default router;