const path = require('path');
const express = require('express');
const { engine } = require('express-handlebars');
const morgan = require('morgan');
const mongoose = require('mongoose');
var methodOverride = require('method-override')
const SortMiddleware = require('./app/middlewares/SortMiddleware')
const db = require('./config/db');



const app = express();
const post = 3000;

//npm start
// routers
const route = require('./routes/index');

//locate public
app.use(express.static(path.join(__dirname, 'public')));

//http
app.use(
   express.urlencoded({
      extended: true,
   }),
);
app.use(express.json());
app.use(morgan('combined'));
//method-override
app.use(methodOverride('_method'))

//custom middlewares
app.use (SortMiddleware);

//template engine
app.engine(
   'hbs',
   engine({
      extname: '.hbs',
      helpers: require('./helpers/handlebars'),
   })
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources','views'));

// //request
// app.get('/', (req, res) => {
//     res.render('home');
// })

// // app.get('/news', (req, res) => {
// //     res.render('news');
// // })

// app.get('/search', (req, res) => {
//     console.log(req.query.q) //?q=value&
//     res.render('search');
// })

// app.post('/search', (req, res) => {
//     res.send();
// })

// routes folder
route(app);


//connect db

db.connect()

app.listen(post, () => console.log('app listening'));

//localhost:3000
