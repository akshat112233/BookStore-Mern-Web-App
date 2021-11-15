const { Schema,model } = require("mongoose");

const productSchema = new Schema({
    productName: {
        type: String,
        trim: true,
        required: true
    },
    price: {
        type: Number,
        trim: true,
        required: true
    },
    picture: {
        type: String,
        default: null
    },
    description: {
        type: String
    }
});
const ProductModel = model("ProductModel", productSchema);
module.exports = ProductModel;