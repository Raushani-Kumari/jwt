import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    pid: { type: Number, unique: true, required: true },
    productTitle: { type: String, unique: true, required: true },
    productDescription: { type: String, required: true },
    productPrice: { type: Number, required: true },
    productBrand: { type: String, required: true },
    productCategory: { type: String, required: true },
    productImage: { type: [String] },
    productStock: { type: Number },
    productRating: { type: Number },
})

const Products = mongoose.model('Products', productSchema);

export default Products;