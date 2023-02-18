//const { countDocuments } = require("../models/course");
const course = require("../models/course");
const { MongooseToObject } = require("../util/mongoose");
const { multipleMongooseToObject } = require("../util/mongoose");

class NewsController {
  //get, post, put, delete, options, head

  //get /news/:slug
  show(req, res, next) {
    course
      .findOne({ slug: req.params.slug })
      .then((course) =>
        res.render("news/pagedetail", { course: MongooseToObject(course) })
      )
      .catch(next);
  }

  //get /news/create
  create(req, res) {
    res.render("news/create");
  }

  //post /news/store
  store(req, res, next) {
    // res.json(req.body);
    const data = req.body;
    data.image = `https://img.youtube.com/vi/${data.IDvideo}/sddefault.jpg`; //dung nhay `
    
    const courses = new course(data);
    courses
      .save()
      .then(() => res.redirect("/news"))
      .catch((err) => {});
  }

  //get /news/listnews (count)
  listnews(req, res, next) {
    
    // res.json(res.locals._sort)



    //promise: lenh dung de thuc thi hoan thanh nhiem vu tung buoc
    Promise.all([ course.find({}).sortable(req),
      ,course.countDocumentsDeleted()])
      .then(([courses, deletedCount]) =>
        res.render("news/listnews", {
          deletedCount,
          courses: multipleMongooseToObject(courses),
        })
      )
      .catch(next);
  }

  //get /news/:id/edit
  edit(req, res, next) {
    course
      .findById(req.params.id)
      .then((courses) =>
        res.render("news/edit", { courses: MongooseToObject(courses) })
      ) //render
      .catch(next);
  }

  //put /news/:id
  update(req, res, next) {
    // res.json(req.body)
    course
      .updateOne({ _id: req.params.id }, req.body)
      .then(
        () => res.redirect("listnews") //tạo ra một header location
      )
      .catch(next);
  }

  //delete /news/:id (soft delete)
  deleteList(req, res, next) {
    course
      .delete({ _id: req.params.id }, req.body) //const mongoosedelete = require('mongoose-delete');
      .then(
        () => res.redirect("back") //back: trả về trang trước
      )
      .catch(next);
  }

  //get /news/trash
  trash(req, res, next) {
    course
      .findDeleted({ deleted: true })
      .then((courses) => {
        // courses = courses.map(courses => courses.toObject())
        res.render("news/trash", {
          courses: multipleMongooseToObject(courses),
        });
      })
      .catch(next);
  }

  // //post /news/listnew/:id (restore from trash)
  // restoreTrash(req, res, next) {
  //   course
  //     .restore({ _id: req.params.id })
  //     .then(() => res.redirect("back"))
  //     .catch(next);
  // }

  //patch /news/listnew/:id/restore (restore from trash)
  restoreTrash(req, res, next) {
    course
      .restore({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  //post /news/listnew/:id (restore all from trash)
  restoreTrashAll(req, res, next) {
    course
      .restore({ deleted: true })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  //delete /news/trash/:id (normal delete)
  deleteTrash(req, res, next) {
    course
      .deleteOne({ _id: req.params.id }, req.body)
      .then(
        () => res.redirect("back") //back: trả về trang trước
      )
      .catch(next);
  }

  //delete /news/trash/:id (normal delete all from trash)
  deleteTrashAll(req, res, next) {
    course
      .deleteMany({ deleted: true })
      .then(
        () => res.redirect("back") //back: trả về trang trước
      )
      .catch(next);
  }

  //post /news/handle-form-action
  handleFormAction(req, res, next) {
    switch (req.body.action) {
      case "delete":
        course
          .delete({ _id: { $in: req.body.ObjectId } }) //$in: loc gia tri
          .then(
            () => res.redirect("back") //back: trả về trang trước
          )
          .catch(next);
        break;
      default: //delete
        res.json({ message: "Action is invalid!" });
    }
  }
}

module.exports = new NewsController();

// const news = require('./NewsControllers')
