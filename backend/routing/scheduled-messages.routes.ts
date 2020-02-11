import * as express from 'express';
import scheduledMessagestorage from '../storage/scheduled-message.storage';
import { authenticate } from './auth-middleware';

const router = express.Router();


router.post('/api/scheduled-messages/add', authenticate, async (req, res) => {
    await scheduledMessagestorage.addNewScheduledMessage(req.body.message);
    res.sendStatus(201);
});

router.get('/api/scheduled-messages/messages', authenticate, async (_req, res) => {
    const messages = await scheduledMessagestorage.getAllMessages();
    res.json(messages);
});

router.put('/api/scheduled-messages/message', authenticate, async (_req, res) => {
    await scheduledMessagestorage.updateMessageById(_req.body.message);
    res.sendStatus(204);
});

export default router;