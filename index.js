const exp = require("express")();
const { json } = require("express");
const mongoose = require("mongoose");
require("dotenv").config({ path: './.env' });
const cors = require('cors');

exp.use(cors());
const connect = async () => {
    try {
        await mongoose.connect(process.env.DB_Url, { useNewUrlParser: true, UseUnifiedTopology: true });
        console.log("connected");
    }
    catch(error) {
        console.log('error: ', error);
    }
};

//import routes
const userRoutes = require("./routers/users/user.routes");
const orderRoutes = require("./routers/orders/orders.routes");
const productRoutes = require("./routers/products/products.routes");
const wishListRoutes = require("./routers/wishlist/wishlist.routes");
connect();
exp.use(json());
exp.use(userRoutes);
exp.use(orderRoutes);
exp.use(productRoutes);
exp.use(wishListRoutes);

exp.use((req, res, next) => {
    console.log("query : ", req.query);
    console.log("body : ", req.body);
    next();
});
exp.listen(4000, () => {
    console.log("server satrted at 4000");
})