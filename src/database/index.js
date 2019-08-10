import mongoose from "mongoose";
import mongoConfig from "../config/mongo";

class Database {
  constructor() {
    this.mongo();
  }

  mongo() {
    this.mongoConnection = mongoose.connect(mongoConfig.mongoUrl, {
      useNewUrlParser: true,
      useFindAndModify: true
    });
  }
}

export default new Database();
