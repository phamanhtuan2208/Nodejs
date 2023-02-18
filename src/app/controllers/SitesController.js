const Course = require("../models/course");
const { multipleMongooseToObject } = require("../util/mongoose");

class SidesController {
  //get /news
  // index(req, res) {

  //    // res.render('home');

  //    Course.find({}, function (err, courses) {
  //       if (!err) res.json(courses);
  //       else res.status(404).json({error: 'err'});
  //     });

  // }

  //get /
  index(req, res) {
    res.render("home");
  }
  //get /news
  news(req, res, next) {
    Course.find({})
      .then((courses) => {
        //courses = courses.map(courses => courses.toObject())
        res.render("news", { courses: multipleMongooseToObject(courses) });
      })
      .catch(next);
  }
  //get /search
  search(req, res) {
    res.render("search");
  }
}

module.exports = new SidesController();

// const news = require('./NewsControllers')
