import Products from "../models/productModel.js";
import { v4 as uuidv4 } from 'uuid';
// fetch the data to be posted from frontend to the body
// after fetchingthe data
// check if that product is already present in the db or not
// if present send a message ...product already exist , update your product
// if no present then, 
// add product details to the products db
const addProduct = async (req, res) => {
    try {
        console.log("req.body is ", req.body);
        const { pid, productTitle, productDescription, productPrice, productBrand, productCategory, productImage, productStock, productRating } = req.body;
        console.log("prodcut id : ", pid);

        if (!req.body) {
            console.log("no product found")
            return res.status(400).json({ error: "Product is required" });
        }
        const existingProduct = await Products
            .findOne({pid});
            console.log("existing product", existingProduct)
        if (existingProduct) {
            console.log("product already present in db");
            return res.json({ message: "product already present in the db...u need to update it" });
        }
        // adding product details to db
        const product = new Products({ pid, productTitle, productDescription, productPrice, productBrand, productCategory, productImage, productStock, productRating });
        console.log("product : ", product)
        await product.save();
        console.log("product saved")
        return res.status(201).json({
            product,
            message: "Product added Successfully...",
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Couldn't add product" });
    }

}

export { addProduct };