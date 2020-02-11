import * as express from 'express';
import defaultAuthProcessor from '../business/auth.processor';

const router = express.Router();

router.post('/api/user/login', (req, res) => {
    try {
        const authToken = defaultAuthProcessor.validateLogin(req.body.password);
        res.json(authToken);
    } catch (err) {
        res.status(401).send({ message: err.message });
    };

});

export default router;