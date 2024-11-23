import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productId: { type: Number, unique: true, required: true },
    productTitle: { type: String, required: true },
    productDescription: { type: String, required: true },
    productPrice: { type: Number, required: true },
    productBrand: { type: String, required: true },
    productCategory: { type: String, required: true },
    // image: { type: [String] },
    image: {
        type: {
            file: { type: Map, of: String }, // stores metadata like 'uid'
            fileList: [{ type: Map, of: String }] // stores array of file metadata
        },
        required: true
    },
    productStock: { type: Number },
    // productRating: { type: Number },
})

const Products = mongoose.model('Products', productSchema);

export default Products;