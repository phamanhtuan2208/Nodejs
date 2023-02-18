const SiteRouter = require('./site');
const NewsRouter = require('./news');



function route(app) {

   app.use('/news', NewsRouter);

   app.use('/', SiteRouter);



   //request

   // app.get('/', (req, res) => {
   //     res.render('home');
   // })

   // app.get('/news', (req, res) => {
   //     res.render('news');
   // })

   // app.get('/search', (req, res) => {
   //     console.log(req.query.q) //?q=value&
   //     res.render('search');
   // })

   // app.post('/search', (req, res) => {
   //     res.send();
   // })
}

module.exports = route;
