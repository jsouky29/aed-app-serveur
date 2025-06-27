const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRET_KEY); // Utilise la clé secrète de l'environnement
        req.userData = { id: decoded.id }; // Stocke l'ID de l'utilisateur dans req.userData
        next();
    } catch (error) {
        res.status(401).json({ error: 'Authentification échouée!' });
    }
};
