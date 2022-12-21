const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Chips = require("../models/Chips");
require('dotenv').config();

/**
 * @openapi
 * /chips/moyenne-lipides-par-marque:
 *   get:
 *    tags:
 *      - chips
 *    description: La moyenne des lipides maximal classé par marque de croustille.
 *    responses:
 *       200:
 *         description: Résultat des moyennes trouvée.
 *       500:
 *         description: Une erreur est survenue
 */
router.get('/moyenne-lipides-par-marque', async (req, res) => {
    await mongoose.connect(process.env.MONGODB_APP_URI);
    try {
        const chips = await Chips.aggregate([{ $group: { _id: '$marque', lipidesMoyenne: { $avg: "$lipides" } } }]);
        console.log(req.params);
        res.json(chips);
        console.log(chips)
    } catch (err) {
        console.log(err);
        res.status(500).json({ erreur: 'Une erreur est survenue..' });
    }
    finally {
        mongoose.connection.close();
    }
});

/**
 * @openapi
 * /chips/max-glucides-par-marque:
 *   get:
 *    tags:
 *      - chips
 *    description: Le maximum des glucides classé par marque de croustille.
 *    responses:
 *       200:
 *         description: Résultat des maximum trouvée.
 *       500:
 *         description: Une erreur est survenue
 */
router.get('/max-glucides-par-marque', async (req, res) => {
    await mongoose.connect(process.env.MONGODB_APP_URI);
    try {
        const chips = await Chips.aggregate([{ $group: { _id: '$marque', glucidesMax: { $max: "$glucides" } } }]);
        console.log(req.params);
        res.json(chips);
        console.log(chips)
    } catch (err) {
        console.log(err);
        res.status(500).json({ erreur: 'Une erreur est survenue..' });
    }
    finally {
        mongoose.connection.close();
    }
});

module.exports = router;