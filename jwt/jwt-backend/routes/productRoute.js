import express from "express";
import { addProduct } from "../controllers/productController.js";
import Products from "../models/productModel.js";

const router = express.Router();

// addproduct - controller for post api call
router.post("/upload", addProduct, async (req, res) => {
  const { productData } = req.body;
  console.log("product added....", productData);
  return res.status(200).json({ message: "Addeddddddd" });
});

// fetching all the products
router.get("/products", async (req, res) => {
  try {
    const products = await Products.find(); // Fetch all products from the database
    res.json(products); // Return the products as JSON
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).send("Server error");
  }
});

// what if while updating, they updated image
// giving user chance to update product image

// router.put("/product-update/:id", async (req, res) => {
//   try {
//     const { currentProduct } = req.body;
//     const updatedProducts = await Products.findByIdAndUpdate(
//       currentProduct._id
//     );
//     Products.map((product) =>
//       product.productId === updatedProducts._id ? updatedProducts : product
//     );

//     await updatedProducts.save();

//     res.json(updatedProducts);
//   } catch (error) {
//     message.error("Error in updating ", error);
//     res.status(500).send("Server error");
//   }
// });
router.put("/product-update/:id", async (req, res) => {
    try {
      const { currentProduct } = req.body;  // This should contain the updated product data
      console.log("producut to be updated : ", currentProduct)
      const updatedProduct = await Products.findByIdAndUpdate(
        req.params.id,  
        currentProduct,  
        { new: true } 
      );
  
      // If the product wasn't found
      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
  message.success("product updated....")
      res.json(updatedProduct);  // Send the updated product as the response
    } catch (error) {
      console.log("Error in updating product:", error);
      res.status(500).send("Server error");
    }
  });
  

// router.delete("/product-delete", async (req, res) => {
//   try {
//     const { currentProduct } = req.body;
//     const deletedProduct = await Products.findByIdAndDelete(currentProduct._id);
//     res.send(deletedProduct);
//     res.json("product deleted");
//   } catch (error) {
//     message.error("error in deleting", error);
//     res.status(500).send("server error");
//   }
// });

router.delete("/product-delete/:id", async (req, res) => {
    try {
      const deletedProduct = await Products.findByIdAndDelete(req.params.id);  // Find and delete the product by ID
  console.log("product to be deleted : ", deletedProduct)
      if (!deletedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      res.json({ message: "Product deleted successfully", product: deletedProduct });
    } catch (error) {
      console.log("Error in deleting product:", error);
      res.status(500).send("Server error");
    }
  });
  

export default router;
