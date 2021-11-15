const { Schema,model} = require("mongoose");
const userSchema = new Schema({
  userName: {
    type: String,
    trim:true,
    // required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String
    },
    address: {
        type: String
    },
    contact: {
        type: String
    },
    role: {
        type: String
    },
});
const UserModel = model("UserModel", userSchema);
module.exports = UserModel;