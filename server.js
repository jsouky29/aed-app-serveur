const express = require('express');
const mongoose = require('mongoose');
var cors = require('cors')
const app = express();
app.use(cors());
require('dotenv').config();

// Middleware pour le parsing JSON
app.use(express.json());

// Connexion à MongoDB
mongoose.connect(process.env.mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('error', err => {
    console.error('MongoDB connection error:', err);
});

// Routes
// Auth
const authRouter = require('./routes/authRoutes');
app.use('/auth', authRouter);
// Trans
const transRouter = require('./routes/transRoutes');
app.use('/trans', transRouter);

// Démarrage du serveur
const PORT = process.env.port;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
