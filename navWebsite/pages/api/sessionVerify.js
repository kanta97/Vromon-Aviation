var jwt = require('jsonwebtoken');

export default async function (req, res) {
    const token = req.body.token

    try {
        const decoded = jwt.verify(token, 'YXJhZmF0J3Mgc2VjcmV0IGNvZGU=');
        res.json({ success: true, flightDetails: decoded.data })
    } catch (e) {
        res.json({ success: false })
    }
}