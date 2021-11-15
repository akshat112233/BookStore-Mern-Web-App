const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const orderSchema = new Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"ProductModel"  
  },
  orderDate: {
    type: Date,
  },
  transactionId: {
    type: String
  },
  address: {
    type:String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"UserModel"
  }    
});
const OrderModel = mongoose.model("OrderModel", orderSchema);
module.exports = OrderModel;