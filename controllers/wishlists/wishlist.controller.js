const wishListModel = require('../../models/wishlists/wishlist.model');
// Add items to wishlist
exports.addToWishListController = async (req, res) => {
    const userId = req.user._id;
    const user = req.user;
    try {
        if (user.role !== "USER") {
            res.status(401).json({ error: "Access Denied", code: 401 });
        } else {
            const newWishList = new wishListModel({
                product: req.body.productId,
                user: userId
            });
            await newWishList.save();
            res.status(200).json({ data: newWishList, code: 200 });
        }
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json({ error: "something went wrong", code: 500 });
    }
};
// View Wishlist
exports.myWishlist = async (req, res) => {
    const user = req.user;
    try {
        if (user.role !=="USER") {
            res.status(401).json({ error: "Access Denied", code: 401 });
        } else {
            const wishList= await wishListModel.find({ user: user._id }).populate("product");
            res.status(200).json({ data: wishList, code: 200 });
        }
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json({ error: "something wrong", code: 500 });
    }
};
// remove item from wishlist
exports.removeFromWishList = async (req, res) => {
    const user = req.user;
    try {
        if (user.role !== "USER") {
            res.status(401).json({ error: "Access Denied", code: 401 });
        } else {
            await wishListModel.findByIdAndDelete({ _id: req.query.productId });
            const wishList = await wishListModel.find({ user: user._id });
            res.status(200).json({
                message: "Item removed from wish list", data: wishList, code: 200
            });
        }
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json({error:"Something wrong",code:500})
    }
}