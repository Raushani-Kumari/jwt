import Products from "../models/productModel.js";
// fetch the data to be posted from frontend to the body
// after fetchingthe data
// check if that product is already present in the db or not
// if present send a message ...product already exist , update your product
// if no present then,
// add product details to the products db
const addProduct = async (req, res) => {
  console.log("res from ui", req.body);

  const existingProduct = await Products.findOne({ pid: req.body.productId });
  console.log("existing product", existingProduct);
  if (existingProduct) {
    console.error("product already present in db");
    return res.json({ message: "product already present in db" });
  }
  try {
    const newProduct = new Products({
      productId: req.body.productId,
      productTitle: req.body.productTitle,
      productDescription: req.body.productDescription,
      productPrice: req.body.productPrice,
      productBrand: req.body.productBrand,
      productCategory: req.body.productCategory,
      productStock: req.body.productStock,
      productImage: { data: req.body.image, contentType: "image/png" },
    });
    await newProduct.save();
    console.log("saved new product");
    res.status(200).send("Product uploaded successfully");
  } catch (error) {
    console.log("error in uploading at server", error);
    res.status(500).send("Error uploading product");
  }
};

export { addProduct };
