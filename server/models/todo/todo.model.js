const mongoose = require("mongoose");
const {
  Schema,
  Schema: {
    Types: { ObjectId },
  },
} = mongoose;

const TodoSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  owner: { type: ObjectId, ref: "Person" }, // Works because person model will be stored in mongoose by the time this is queried
});

Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;
