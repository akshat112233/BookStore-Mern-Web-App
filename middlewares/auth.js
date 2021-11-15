require("dotenv").config({ path: "../.env" });
const User = require("../models/users/user.model");
const jwt = require('jsonwebtoken');

const auth = async (req, res,next) => {
    try {
        const headToken = req.header('Authorization'); //getting token from header and removing bearer from it
        const token = headToken.replace('Bearer ','');
        if (!token) {
            const error = "invalid authorization token !!";
            res.json({ error, code: 404 });
        }

        const decode = await jwt.verify(token, process.env.secretKey); // token verification
        console.log('decode: ', decode);
        const user = await User.findOne({ _id: decode._id }); // finding user by id

        if (!user) {
            const error = "invalid user";
            res.json({ error, code: 404 });
        }
        req.user = user;
        next();
    } catch (error) {
        console.log('error: ', error);
        res.json({ error:'something wrong', code: 404 });
    }
}

module.exports = auth;