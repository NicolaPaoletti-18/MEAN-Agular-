const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const path = require('path'); 
const cors = require('cors'); 

const employeeController = require('./controllers/employeeController'); 



mongoose.connect("mongodb+srv://NicolaPaols:Password123@cluster0.kzsn8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
{ useNewUrlParser: true,
  useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json()); 
app.use(cors({ origin: 'http://localhost:4200'}));
app.use('/employees', employeeController)



module.exports = app; 