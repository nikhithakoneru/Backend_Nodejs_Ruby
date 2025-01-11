
const express = require('express');
const productController = require("../controllers/productController");
const path = require('path');
const router = express.Router();
const firmController = require('../controllers/firmController');
router.post('/add-product/:firmId', productController.addProduct);
router.get('/:firmId/products', productController.getProductByFirm);

//standard format for getting images
router.get('/uploads/:imageName', (req, res)=>{
    const imageName = req.params.imageName;
    res.headersSent('Content-Type', 'image/jpeg');
    // res.setHeader('Content-Type', 'image/jpeg');
    res.sendFile(path.join(__dirname, '..', 'uploads', imageName));
});

router.delete('/:productId', productController.deleteProductById);

module.exports = router;