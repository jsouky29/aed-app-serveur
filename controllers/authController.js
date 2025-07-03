const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = process.env.SECRET_KEY;

exports.login = async (req, res) => {
    try {
        const { userId, password } = req.body;
        const user = await User.findOne({ userId });
        if (!user) {
            return res.status(400).json({ error: 'Utilisateur non trouvé' });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ error: 'Mot de passe incorrect' });
        }
        const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '30d' });
        res.json({ token });
    } catch (err) {
        res.status(400).json({ error: 'Échec de la connexion' });
    }
};

exports.signUp = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({ userId: req.body.userId, password: hashedPassword });
        await user.save();
        res.status(201).send({ message: 'Utilisateur créé avec succès' });
    } catch (err) {
        res.status(400).send({
            error: "Échec de la création de l'utilisateur"
        });
    }
};