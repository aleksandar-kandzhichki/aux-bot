import * as express from 'express';
import scheduledMessagestorage from '../storage/scheduled-message.storage';
import { authenticate } from './auth-middleware';
import { ScheduledMessage } from '../appInterfaces/IScheduledMessage';
import { wrap } from './wrapper';

const router = express.Router();


router.post('/api/scheduled-messages/add', authenticate, wrap(async (req, res) => {
    const message = new ScheduledMessage(req.body.message);
    await scheduledMessagestorage.addNewScheduledMessage(message);
    res.sendStatus(201);
}));

router.get('/api/scheduled-messages/messages', authenticate, wrap(async (_req, res) => {
    const messages = await scheduledMessagestorage.getAllMessages();
    res.json(messages);
}));

router.put('/api/scheduled-messages/message', authenticate, wrap(async (_req, res) => {
    const message = new ScheduledMessage(_req.body.message);
    await scheduledMessagestorage.updateMessageById(message);
    res.sendStatus(204);
}));

export default router;