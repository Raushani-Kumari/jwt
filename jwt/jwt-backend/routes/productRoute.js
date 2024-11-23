import express from 'express';
import { addProduct } from '../controllers/productController.js';

const router = express.Router();


// addproduct - controller for post api call
router.post('/addproduct', addProduct ,async (req,res) => {
    const {productData} = req.body;
    console.log("product added....", productData);
    return res.status(200).json({message: "Addeddddddd"})

})

export default router;