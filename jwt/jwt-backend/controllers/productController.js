import Products from "../models/productModel.js";
// fetch the data to be posted from frontend to the body
// after fetchingthe data
// check if that product is already present in the db or not
// if present send a message ...product already exist , update your product
// if no present then,
// add product details to the products db
const addProduct = async (req, res) => {
  console.log("res from ui", req.body);

  // const existingProduct = await Products.findOne({ ptitle: req.body.productTitle });
  // console.log("existing product", existingProduct);
  // if (existingProduct) {
  //   console.error("product already present in db");
  //   return res.json({ message: "product already present in db" });
  // }

  const base64Image = req.body.image;
  const imagePattern = /^data:image\/(jpeg|jpg|png);base64,/;

  if (!imagePattern.test(base64Image)) {
    console.error("Invalid image format. Only jpeg, jpg, and png are allowed.");
    return res
      .status(400)
      .send("Invalid image format. Only jpeg, jpg, and png are allowed.");
  }

  // Extract content type and base64 image data
  const matches = base64Image.match(/^data:image\/(jpeg|jpg|png);base64,(.+)$/);
  const contentType = matches[1];
  const imageData = matches[2];

  // Convert base64 string to Buffer
  // const imageBuffer = Buffer.from(imageData, "base64");

  try {
    const newProduct = new Products({
      // productId: req.body.productId,
      productTitle: req.body.productTitle,
      productDescription: req.body.productDescription,
      productPrice: req.body.productPrice,
      productBrand: req.body.productBrand,
      productCategory: req.body.productCategory,
      productStock: req.body.productStock,
      image: { data: imageData, contentType: `image/${contentType}` },
    });
    await newProduct.save();
    console.log("saved new product");
    // res.send(newProduct)
    res.status(200).send("Product uploaded successfully");
  } catch (error) {
    console.log("error in uploading at server", error);
    res.status(500).send("Error uploading product");
  }
};

export { addProduct };
