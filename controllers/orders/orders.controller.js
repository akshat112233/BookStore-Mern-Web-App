const ordermodel = require('../../models/orders/orders.model');

//place order
exports.placeOrderController = async (req, res) => {
    const userId = req.user._id;
    const user = req.user;
    try {
        if (user.role !=="USER") {
            return res.status(401).json({
                error: "Access Denied",
                data: null,
                code:401
            })
        } else {
            const newOrder = new ordermodel({
                product: req.body.productId,
                orderDate: req.body.todaysDate,
                transactionId: req.body.transactionId,
                address: req.body.address,
                user: userId
            });
            await newOrder.save();
            res.status(200).json({ data: newOrder, code: 200 });
        }
    } catch (error) {
        console.log('error: ', error);
    }
}
//order detail
exports.myOrderController = async (req, res) => {
    const user = req.user;
    try {
        if (user.role !== "USER") {
            return res.status(401).json({
                error: "Access Denied",
                data: null,
                code: 401
            });
        }
        const myOrders = await ordermodel.find({ user: user._id }).populate("product").populate("user");
        res.status(200).json({ data: myOrders, code: 200 });
    } catch (error) {
        console.log('error: ', error);
        res.status(500).json({
            error: "Something Wrong",
            data: null,
            code: 500
        });
    }
}