const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = '52e4d52f23d204d418ad64c33c095051b2430322a2a47d8b378aede350661a21bf0c3c33991a998ff5314bc053d3ce66';
const mongoose = require('mongoose');
const axios = require('axios');

exports.login = async (req, res) => {
    try {
        const user = await User.findOne({ userId: req.body.userId });
        if (!user) {
            return res.status(400).send({ error: 'Utilisateur non trouvé' });
        }
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(400).send({ error: 'Mot de passe incorrect' });
        }
        const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '30d' });
        res.send({ token });
    } catch (err) {
        res.status(400).send({ error: 'Échec de la connexion' });
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