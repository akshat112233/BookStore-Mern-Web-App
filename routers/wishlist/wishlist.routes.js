const router = require("express").Router();
const auth = require("../../middlewares/auth");
const controller = require("../../controllers/wishlists/wishlist.controller");

//add to wishlist
router.post("/api/add/wishlist",auth,controller.addToWishListController);

//view wishlist
router.get("/api/view/wishlist", auth, controller.myWishlist);

//delete from wishlist
router.delete("/api/remove/from/wishlist", auth, controller.removeFromWishList);

module.exports = router;