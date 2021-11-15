const router = require("express").Router();
const controller = require('../../controllers/orders/orders.controller');
const auth = require('../../middlewares/auth');

router.post('/api/place/order', auth, controller.placeOrderController);
router.get('/api/my/orders', auth, controller.myOrderController);

module.exports = router;