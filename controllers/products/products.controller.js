const productmodel = require('../../models/products/products.model');
const {cloudinary} = require('cloudinary');

//add product controller
exports.addProductController = async (req, res) => {
    const user = req.user;
    try {
        if (user.role !=="ADMIN") {
            res.json({
                error: 'you are not admin', code: 401, data:null
            })
        }
        else {
            //const uploadResponse = await cloudinary.uploader.upload(req.body.picture, { upload_preset: "test-media" });
            const newProduct = new productmodel({
                productName: req.body.productName,
                price: req.body.price,
                description: req.body.description
            });
            await newProduct.save();
            res.json({
                data: newProduct, err: null, code: 200
            });
        }
    } catch (error) {
        console.log('error: ', error);
    }
}
//get product details controller for admin
exports.fetchProductController = async (req, res) => {
    const user = req.user;
    try {
        if (user.role !== "ADMIN") {
            res.json({
                error: 'you are not admin', code: 401, data: null
            })
        } else {
            const BookDetails = await productmodel.find({});
            res.json({ data: BookDetails, err: null, code: 200 });
        }
    } catch (error) {
        console.log('error: ', error);
    }
}
//get product details controller
exports.fetchUserProductController = async (req, res) => {
    try {
        const BookDetails = await productmodel.find({});
        res.json({ data: BookDetails, err: null, code: 200 });
    } catch (error) {
        console.log('error: ', error);
        
    }
}
//remove product controller
exports.removeProductController = async (req, res) => {
    const user = req.user;
    try {
        if (user.role!=="ADMIN") {
            res.json({
                error: 'you are not admin', data: null, code: 401
            });
        } else {
            await productmodel.findByIdAndDelete({_id:req.query.productId});
            res.json({message:"deleted successfully",data : model.find({}), err : null, code : 200});
        }
    } catch (error) {
        console.log('error: ', error);
    }
}
//update product details
exports.updateProductController = async (req, res) => {
    const user = req.user;
    try {
        if (user.role !== "ADMIN") {
            res.json({
                error: 'you are not admin', data: null, code: 401
            });
        } else {
            await productmodel.findByIdAndUpdate(req.query.productId, {
                productName: req.body.productName,
                price: req.body.price,
                description: req.body.description
            });
            res.json({ message: "product updated successfully", data: model.find({}), err: null, code: 200 });
        }
    } catch (error) {
        console.log('error: ', error);
    }
}