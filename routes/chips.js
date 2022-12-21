const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Chips = require("../models/Chips");


require('dotenv').config();

/**
 * @openapi
 * /chips:
 *   get:
 *     tags:
 *        - chips
 *     description: Obtiens la liste des croustilles.
 *     responses:
 *      '200':
 *        description: La liste des croustilles.
 *        content: 
 *          application/json:
 *            schema: 
 *                type: array
 *                
 *      '500':
 *        description: Une erreur est survenue.
 */
router.get('/', async (req, res) => {
  await mongoose.connect(process.env.MONGODB_APP_URI);
  try {
      const chips = await Chips.find({});
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
 * /chips/{id}:
 *   get:
 *    tags:
 *      - chips
 *    description: Recupère la marque de croustille ciblé.
 *    parameters:
 *    - name: _id
 *      in: path
 *      required: true
 *      description: le id de la marque de croustille.
 *      schema:
 *        type: number
 *    responses:
 *       200:
 *         description: Le résultat de la marque de croustille trouvée.
 *       500:
 *         description: Une erreur est survenue.
 */
router.get('/:id', async (req, res) => {
    await mongoose.connect(process.env.MONGODB_APP_URI);
    try {
        const chips = await Chips.find({'_id': req.params.id});
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
 * /chips/{nom}:
 *   get:
 *    tags:
 *      - chips
 *    description: Recupère la marque de croustille ciblé par sont nom.
 *    parameters:
 *    - name: nom
 *      in: path
 *      required: true
 *      description: le nom de la marque de croustille.
 *      schema:
 *        type: string
 *    responses:
 *       200:
 *         description: Le résultat de la marque de croustille trouvée.
 *       500:
 *         description: Une erreur est survenue.
 */
router.get('/nom/:nom', async (req, res) => {
    await mongoose.connect(process.env.MONGODB_APP_URI);
    try {
        const chips = await Chips.find({ 'nom': req.params.nom });
        console.log(req.params.nom);
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
 * /chips/calorie/{nombre}:
 *   get:
 *    tags:
 *      - chips
 *    description: Recupère la marque de croustille avec le nombre de calorie.
 *    parameters:
 *    - name: nombre
 *      in: path
 *      required: true
 *      description: La marque de croustille.
 *      schema:
 *        type: number
 *    responses:
 *       200:
 *         description: Le résultat de la marque de croustille trouvée.
 *       500:
 *         description: Une erreur est survenue.
 */
router.get('/marque/:marque', async (req, res) => {
    await mongoose.connect(process.env.MONGODB_APP_URI);
    try {
        const chips = await Chips.find({'marque': { $lte: req.params.marque } });
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
 * 
 * /chips/{id}:
 *   delete:
 *    tags:
 *      - chips
 *    description: Supprime la marque de croustille ciblé avec sont id.
 *    parameters:
 *    - name: id
 *      in: path
 *      required: true
 *      description: Le id de la marque de croustille.
 *      schema:
 *        type: number
 *    responses:
 *       200:
 *         description: le résultat de la requête de suppression.
 *       500:
 *         description: Une erreur est survenue.
 */
router.delete('/:id', async (req, res, next) => {
    await mongoose.connect(process.env.MONGODB_APP_URI);
    try {
        const chips = await Chips.deleteOne({'_id':req.params.id})
        console.log(req.params);
        res.json(chips);
        console.log(chips)
    } catch (err) {
        console.log(err);
        res.status(200).json({ erreur: err.message });

    } finally {
        mongoose.connection.close();
    }
});

/**
 * @openapi
 * /chips/{id}:
 *   put:
 *     tags:
 *        - chips
 *     description: Modifie une sorte de croustille.
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *        description: Le résultat de la requête d'ajout.
 */
router.put('/:id', async (req, res) => {
    await mongoose.connect(process.env.MONGODB_APP_URI);
    try {
        const chips = await Chips.findOne({'_id': req.params.id});    
        await chips.updateOne(req.body);
        res.json(req.body);  
    } catch (err) {
        console.log(err);
        res.status(200).json({ erreur: err.message });

    } finally {
        mongoose.connection.close();
    }
});

/**
 * @openapi
 * /chips:
 *   post:
 *     tags:
 *        - chips
 *     description: Ajoute une une sorte de croustille.
 *     responses:
 *       200:
 *        description: Le résultat de la requête d'ajout.
 */
router.post('/', async (req, res) => {
    await mongoose.connect(process.env.MONGODB_APP_URI);
    try {
        const chips = new Chips(req.body);
        await chips.save();
        console.log(chips.calories);
        res.json(chips);     
    } catch (err) {
        console.log(err);
        res.status(200).json({ erreur: err.message });

    } finally {
        mongoose.connection.close();
    }
});

module.exports = router;
