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
        const {productDetails} = req.body;
        console.log("product details from re.body : ", productDetails);
        const { productId, productTitle, productDescription, productPrice, productBrand, productCategory, image, productStock } = productDetails;
        if (!req.body) {
            console.log("no product found")
            return res.status(400).json({ error: "Product is required" });
        }
        console.log("pid : ", productId)
        const existingProduct = await Products
            .findOne({productId});
            console.log("existing product", existingProduct)
        if (existingProduct) {
            console.error("product already present in db");
            return res.json({ message: "product already present in db" });
        }
        // adding product details to db
        const product = new Products({ productId, productTitle, productDescription, productPrice, productBrand, productCategory, image, productStock });
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