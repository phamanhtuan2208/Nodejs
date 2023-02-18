const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");
const mongoosedelete = require("mongoose-delete");

//data
const coursesSchema = new Schema(
  {
    name: { type: String, default: "", required: true },
    description: { type: String },
    date: { type: String },
    image: { type: String, default: "" },
    slug: { type: String, slug: "name", unique: true }, //tu dong tao slug theo name va unique tranh tao trung href
    IDvideo: { type: String },
    content: { type: String },
    updateAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: Date.now },
  },
  {
    timestamp: true,
  }
);


//custom query helpers
coursesSchema.query.sortable = function (req, res) {
  if (req.query.hasOwnProperty('_sort')) {
    // res.json({message: 'suss'})
    // return;
    const isValidtype = ['asc', 'desc'].includes(req.query.type);
    return this.sort({
      name: isValidtype ? req.query.type: 'desc',  //default desc if change 
    });
  }
  return this;
}

//plugin
coursesSchema.plugin(mongoosedelete, { overrideMethods: "all" }, { deletedAt: true });
mongoose.set('strictQuery', true);
mongoose.plugin(slug);

module.exports = mongoose.model("Course", coursesSchema);
