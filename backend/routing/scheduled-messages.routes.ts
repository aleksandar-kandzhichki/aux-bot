import * as express from 'express';
import scheduledMessagestorage from '../storage/scheduled-message.storage';
import { wrapper } from './wrapper';

const router = express.Router();


router.post('/api/scheduled-messages/add', wrapper(async (req, res) => {
    await scheduledMessagestorage.addNewScheduledMessage(req.body.message);
    res.sendStatus(201);
}));

router.get('/api/scheduled-messages/messages', wrapper(async (_req, res) => {
    const messages = await scheduledMessagestorage.getAllMessages();
    res.json(messages);
}));

router.put('/api/scheduled-messages/message', wrapper(async (_req, res) => {
    await scheduledMessagestorage.updateMessageById(_req.body.message);
    res.sendStatus(201);
}));

export default router;