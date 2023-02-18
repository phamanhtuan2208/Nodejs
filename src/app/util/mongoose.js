module.exports = {
  multipleMongooseToObject: function (mongooses) { //1 list
    return mongooses.map((mongoose) => mongoose.toObject());
  },

  MongooseToObject: function (mongoose) { //1 gia tri
    return mongoose ? mongoose.toObject() : mongoose;
    
  },
};

