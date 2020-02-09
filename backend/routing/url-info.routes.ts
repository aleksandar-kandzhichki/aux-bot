import * as express from 'express';
import urlInfoStorage from '../storage/url-info.storage';
import { wrapper } from './wrapper';

const router = express.Router();


router.post('/api/url-info/add', wrapper(async (req, res) => {
    await urlInfoStorage.addNewURL(req.body.urlInfo);
    res.sendStatus(201);
}));

router.get('/api/url-info/urls', wrapper(async (_req, res) => {
    const urlsInfo = await urlInfoStorage.getAllURLInfo();
    res.json(urlsInfo);
}));

router.get('/api/url-info/url/:name', wrapper(async (_req, res) => {
    const urlInfo = await urlInfoStorage.findURLInfoByName(_req.params.name);
    res.json(urlInfo);
}));

router.put('/api/url-info/url', wrapper(async (_req, res) => {
    await urlInfoStorage.updateURLInfo(_req.body.urlInfo);
    res.sendStatus(201);
}));

export default router;