const cookie = require('cookie');

const authMiddleware = (req, res, next) => {
    const cookies = cookie.parse(req.headers.cookie || '');
    const authorizationToken = cookies.authorization;

    if (!authorizationToken) {
        return res.status(403).json({ message: 'Authorization token not found in cookies' });
    }

    req.authorizationToken = authorizationToken;
    next();
};

module.exports = authMiddleware;
