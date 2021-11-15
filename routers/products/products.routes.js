const router = require("express").Router();
const controller = require("../../controllers/products/products.controller");
const auth = require("../../middlewares/auth")

//add api
router.post("/api/add/product",auth, controller.addProductController);

//remove api
router.delete("/api/remove/product", auth, controller.removeProductController);

//update api
router.put("/api/update/products", auth, controller.updateProductController);

//fetch api
router.get("/api/get/products",auth, controller.fetchProductController) //for admin

//fetch api
router.get("/api/get/user/products",controller.fetchUserProductController)  //for user

module.exports = router;