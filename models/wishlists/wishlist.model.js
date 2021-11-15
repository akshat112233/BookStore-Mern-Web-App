const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wishListSchema = new Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductModel"
    },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserModel" 
    }
});

const wishListModel = mongoose.model("wishListModel", wishListSchema);
module.exports = wishListModel;