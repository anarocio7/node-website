import path from 'path';
import express from 'express';
import hbs from 'hbs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import cors from 'cors';

import { geocode } from './utils/geocode.js';
import { forecast } from './utils/forecast.js';





// Define paths for Express config

const app = express();

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// Define paths for Express config
const publicDirectory = path.join(__dirname, '../public');
const options = {
  extensions: ['html', 'htm']
};

const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Set up static directory to serve
app.use(express.static(publicDirectory, options));

// Set up handlebars engine and views location - index page
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather app',
    name: 'Anabc'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Page',
    name: 'Anabc'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help Page',
    message: 'This is the help page.',
    name: 'Anabc'
  });
});


app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({ 
      error: 'You must provide an address'
    });
  };
  geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      });
    });
  });

});

app.get('/products', (req, res) => {

  if (!req.query.search) {
    return res.send({ 
      error: 'You must provide a search term'
    });
  };
  res.send({
    products: []
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', { 
    title: '404 Help Page',
    errorMessage: 'Help article not found',
    name: 'Anabc'
  });
});

app.get('*', (req, res) => {
 res.render('404', { 
    title: '404 Page',
    errorMessage: 'Page not found',
    name: 'Anabc'
  });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});