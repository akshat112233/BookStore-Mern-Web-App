const router = require("express").Router();
const controller = require("../../controllers/users/user.controller");

router.post("/api/signin", controller.signinController);

router.post("/api/signup", controller.signupController);

 

module.exports = router;