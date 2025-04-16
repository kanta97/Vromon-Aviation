const jwt = require('jsonwebtoken');
import { tm_ot } from '../../config';

export default async function (req, res) {
    console.log(req.body)
    const sessionToken = jwt.sign({
        data: req.body
    }, 'YXJhZmF0J3Mgc2VjcmV0IGNvZGU=', { expiresIn: tm_ot });

    res.json({ sessionToken })
}