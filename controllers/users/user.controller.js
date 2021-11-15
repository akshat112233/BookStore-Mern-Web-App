const usermodel = require("../../models/users/user.model");
var bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken");
require('dotenv').config({ path: "../../.env" });

exports.signupController = async (req, res) => {
    const Admin = req.query.isAdmin;
    const $isAdmin = Admin === "true" ? true : false;
    try {
        if (!$isAdmin) {
            const isExist = await usermodel.findOne({ email: req.body.email });
            if (isExist) {
                return res.status(400).json({
                    error: "user exists",
                    data: null,
                    code: 400
                });
            }

            const newUser = new usermodel({
                email: req.body.email,
                password: req.body.password,
                role: "USER"
            });

            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(newUser.password, salt);
            newUser.password = hashedPassword;
            await newUser.save();
            newUser.password = undefined;
            res.json({ data: newUser, err: null, code: 200 });
        }
        else {
            const isExist = await usermodel.findOne({ email: req.body.email });
            if (isExist) {
                return res.status(400).json({
                    error: "Admin exists",
                    data: null,
                    code: 400
                });
            }

            const newUser = new usermodel({
                email: req.body.email,
                password: req.body.password,
                role: "ADMIN"
            });
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(newUser.password, salt);
            newUser.password = hashedPassword;
            await newUser.save();
            newUser.password = undefined;
            res.json({ data: newUser, err: null, code: 200 });
        }
    } catch (error) {
        console.log('error: ', error);
    }
};

exports.signinController = async (req, res) => {
    try {
        const user = await usermodel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ error: "invalid user", data: null, code: 404 });
        }

        //comapre password
        const comparePassword = await bcrypt.compare(
            req.body.password,  //input password
            user.password //saved password
        );
        
        if (!comparePassword) {
            return res.status(404).json({ error: "invalid credentials", data: null, code: 404 });
        }

        // token generation
        const token = jwt.sign(
            { _id: user._id.toString() }, //payload
            process.env.secretKey
        );
        user.password = undefined;
        res.status(200).json({data:{user,token},err:null,code:200})
    } catch (error) {
        console.log('error: ', error);
        res.json({ err: "something is wrong", code: 500 });
    }
};