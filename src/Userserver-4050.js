const express = require('express');
const helmet = require('helmet');
const xss = require('xss-clean');
const compression = require('compression');
const cors = require('cors');
const path = require( 'path' );
var bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const pathToSwaggerUi = require('swagger-ui-dist').absolutePath();


const responseTime = require('response-time')
// const axios = require('axios');
const redis = require('redis');


require('dotenv').config()


const swaggerDocument = require('../yml.js');

var Ddos = require('ddos');
    var ddos = new Ddos({burst:5, limit:15});
   
const connection = require(path.resolve( './src/config/db.js'));

const app = express();

app.use(responseTime());

const routes = require(path.resolve( './src/routes'));


app.use(express.static(pathToSwaggerUi));

app.use(ddos.express);

// set security HTTP headers
app.use(helmet());


// app.use(express.json());
app.use(express.json({ strict: false }))

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());


//use router configurations in app
app.use('/api', routes);



app.use(
  "/api-docs",
  swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, { explorer: false })
);


app.get('/api/version', function(req, res) {
  res.send('MyDibba User MicroService v1 running on Port - '+port );
});

// const port = 4050;
const port = process.env.NODE_ENV === 'production' ? 4050 : process.env.PORT;

app.listen(port, () => console.log('Listening on port: ' + port));

module.exports = app;