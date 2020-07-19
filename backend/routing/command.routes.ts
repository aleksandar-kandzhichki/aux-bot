import * as express from 'express';
import defaultCommandInfoStorage from '../storage/command-info.storage';
import { wrap } from './wrapper';

const router = express.Router();


router.get('/api/commands/:commandName/actions/:actionName', wrap(async (req, res) => {
    const data = await defaultCommandInfoStorage.getCommand(req.params.commandName, req.params.actionName);
    res.json(data);
}));


export default router;