import * as express from 'express';
import urlInfoStorage from '../storage/url-info.storage';
import { authenticate } from './auth-middleware';

const router = express.Router();


router.post('/api/url-info/add', authenticate, async (req, res) => {
    await urlInfoStorage.addNewURL(req.body.urlInfo);
    res.sendStatus(201);
});

router.get('/api/url-info/urls', authenticate, async (_req, res) => {
    const urlsInfo = await urlInfoStorage.getAllURLInfo();
    res.json(urlsInfo);
});

router.get('/api/url-info/url/:name', authenticate, async (_req, res) => {
    const urlInfo = await urlInfoStorage.findURLInfoByName(_req.params.name);
    res.json(urlInfo);
});

router.put('/api/url-info/url', authenticate, async (_req, res) => {
    await urlInfoStorage.updateURLInfo(_req.body.urlInfo);
    res.sendStatus(204);
});

export default router;