const Transactions = require('../models/transaction');

exports.newTrans = async (req, res) => {
    try {
        const { type, category, description, montant, createdBy, note, methode } = req.body;

        const newTransaction = new Transactions({
            type,
            category,
            description,
            montant,
            createdBy,
            note,
            methode,
        });

        await newTransaction.save();
        res.status(201).send({ message: 'Transaction créé avec succès', transaction: newTransaction });
    } catch (err) {
        console.error("Error creating transaction:", err);
        res.status(400).send({ error: "Échec de la création de la transaction" });
    }
};

exports.getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transactions.find().sort({ createdAt: -1 });
        res.status(200).send(transactions);
    } catch (err) {
        console.error("Error fetching transactions:", err);
        res.status(500).send({ error: "Erreur lors du chargement des transactions" });
    }
};

exports.deleteTransactionById = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTransaction = await Transactions.findByIdAndDelete(id);

        if (!deletedTransaction) {
            return res.status(404).send({ error: 'Transaction non trouvée' });
        }

        res.status(200).send({ message: 'Transaction supprimée avec succès', transaction: deletedTransaction });
    } catch (err) {
        console.error("Error deleting transaction:", err);
        res.status(500).send({ error: "Erreur lors de la suppression de la transaction" });
    }
};

exports.editTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const update = req.body;

        const updatedTransaction = await Transactions.findByIdAndUpdate(id, update, { new: true });

        if (!updatedTransaction) {
            return res.status(404).send({ error: "Transaction introuvable" });
        }

        res.status(200).send({
            message: "Transaction mise à jour avec succès",
            transaction: updatedTransaction,
        });
    } catch (err) {
        console.error("Erreur lors de la mise à jour de la transaction:", err);
        res.status(400).send({ error: "Échec de la mise à jour de la transaction" });
    }
};

exports.getTransactionById = async (req, res) => {
    try {
        const { id } = req.params;
        const transaction = await Transactions.findById(id);

        if (!transaction) {
            return res.status(404).send({ error: "Transaction not found" });
        }

        res.status(200).send(transaction);
    } catch (err) {
        console.error("Error fetching transaction by ID:", err);
        res.status(500).send({ error: "Erreur lors de la récupération de la transaction" });
    }
};
