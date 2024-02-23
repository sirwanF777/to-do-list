const jwt = require("jsonwebtoken");


exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decodeToken) => {
            if (err) {
                return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });
            } else {
                req.body["user"] = decodeToken;
                next();
            }
        });
    } else {
        return res.status(401).send({ auth: false, message: 'Failed to authenticate token.' });
    }
};