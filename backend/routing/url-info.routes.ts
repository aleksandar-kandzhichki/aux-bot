import * as express from 'express';
import urlInfoStorage from '../storage/url-info.storage';
import { authenticate } from './auth-middleware';
import { wrap } from './wrapper';

const router = express.Router();


router.post('/api/url-info/add', authenticate, wrap(async (req, res) => {
    await urlInfoStorage.addNewURL(req.body.urlInfo);
    res.sendStatus(201);
}));

router.get('/api/url-info/urls', authenticate, wrap(async (_req, res) => {
    const urlsInfo = await urlInfoStorage.getAllURLInfo();
    res.json(urlsInfo);
}));

router.get('/api/url-info/url/:name', authenticate, wrap(async (_req, res) => {
    const urlInfo = await urlInfoStorage.findURLInfoByName(_req.params.name);
    res.json(urlInfo);
}));

router.put('/api/url-info/url', authenticate, wrap(async (_req, res) => {
    await urlInfoStorage.updateURLInfo(_req.body.urlInfo);
    res.sendStatus(204);
}));

export default router;