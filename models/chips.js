const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const ChipsSchema = new Schema(
    {
        nom: {
            type: String,
            maxLenght: [25, 'Le nom est trop long.'],
            required: [true, 'Le nom doit être requis.'],
            validate: {
                validator: function(v) {
                    //Vérifie si la première lettre commence par une majuscule.
                  return /^[A-Z][A-Za-z0-9_-]/.test(v);
                },
                message: props => `${props.value} ne commence pas par une majuscule.`
              },
        },
        description:{
            type: String,
            maxLenght: [250, 'La descrition est trop longue.'],
        },
        marque:{
            type: String,
            maxLenght:[25, "Le nom de la marque est trop long."],
            required: [true, 'La marque doit être requis.']
        },
        lipides:{
            type: Number,
            min: [0, 'Le nombre de lipides ne peut être négatif'],
            max: [999, 'Le nombre de lipides est trop grand'],
            required: [true, 'Le nombre de gras doit être requis.']
        },
        glucides: {
            type: Number,
            min: [0, 'Le nombre de glucide ne peut être négatif'],
            max: [999, 'Le nombre de glucide est trop grand'],
            required: [true, 'Le nombre de glucide doit être requis.']
        },
        proteines:{
            type: Number,
            min: [0, 'Le nombre de proteine ne peut être négatif'],
            max: [999, 'Le nombre de proteine est trop grand'],
            required: [true, 'Le nombre de proteine doit être requis.']
            
        },
        fibres:{
            type: Number,
            min: [0, 'Le nombre de fibre ne peut être négatif'],
            max: [999, 'Le nombre de fibre est trop grand'],
        },
        sucres:{
            type: Number,
            min: [0, 'Le nombre de sucre ne peut être négatif'],
            max: [999, 'Le nombre de sucre est trop grand'],
        },
        fer:{
            type: Number,
            min: [0, 'Le nombre de fer ne peut être négatif'],
            max: [999, 'Le nombre de fer est trop grand'],
        },     
        ingredients:{
            type: [String],
            min:[0, "Le produit doit avoir au moin un ingrédients"],
            max: [50, "Le nombre d'ingrédiant est trop grand"],
        },
        discontinue:{
            type: Boolean,
        },
        dateCreationMarque:{
            type: Date,
        },
        telephone:{
            type: String,
            validate: {
                validator: function(v) {
                    //Vérifie si le format de du numéro de téléphone est valide.
                  return /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/.test(v);
                },
                message: props => `${props.value} le numero est invalide ex: 123-123-1234`
              },
        },
        createurInformation:{
            type: [Object]

        }     
    }
);

//Convertie la date dans le format "YYYY-MM-DD"
ChipsSchema.virtual('dateConvertie').get(function() {
    var dateConvertie = moment(this.dateCreationMarque).format('YYYY-MM-DD');
    return dateConvertie;
});
     

//Calule le nombre de calorie.
  ChipsSchema.virtual('calories').get(function() {
   return (this.proteines * 4) + (this.lipides * 9) + ((this.glucides - this.fibres) * 4);
    
});

module.exports = mongoose.model("Chips", ChipsSchema);
