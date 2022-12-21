var express = require("express"),
  bodyParser = require("body-parser"),
  swaggerJsdoc = require("swagger-jsdoc"),
  swaggerUi = require("swagger-ui-express");

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var chipsRouter = require('./routes/chips');
var statistiqueRouter = require('./routes/statistiques');
var cors = require('cors')


const swagger_options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Chips- Projet Final (50%)",
            version: "1.0.0",
            description: "Api utilisée dans le cadre du cours de dévelopement web 3",
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    apis: ["./routes/*.js"],
};


  
const specs = swaggerJsdoc(swagger_options);

var app = express();
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true })
  );
app.use('/chips', chipsRouter);
app.use('/statistiques', statistiqueRouter);

module.exports = app;
