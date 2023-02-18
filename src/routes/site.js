var express = require('express');
const SidesController = require('../app/controllers/SitesController');
var router = express.Router();

router.get('/search', SidesController.search);

router.get('/news', SidesController.news);

router.get('/', SidesController.index);

module.exports = router;
