// import React, { useEffect, useState } from "react";
// import SellerNav from "./SellerNav";
// import {
//   Button,
//   Rate,
//   Form,
//   Input,
//   Row,
//   Col,
//   Upload,
//   message,
//   Flex,
// } from "antd";
// import { UploadOutlined } from "@ant-design/icons";
// import { useNavigate } from "react-router-dom";

// const AddProduct = () => {
//   const [productDetails, setProductDetails] = useState({
//     productId: 0,
//     productTitle: "",
//     productDescription: "",
//     productPrice: 0,
//     productBrand: "",
//     productCategory: "",
//     ProductImage: "", // Store the image URL or file name here
//     productStock: 0,
//     productRating: 3,
//   });

//   const navigate = useNavigate();
//   const handleRateChange = (value) => {
//     setProductDetails((prevDetails) => ({
//       ...prevDetails,
//       productRating: value,
//     }));
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProductDetails((prevDetails) => ({
//       ...prevDetails,
//       [name]: value,
//     }));
//   };

//   const handleImageChange = (info) => {
//     if (info.file.status === "done") {
//       // Assuming the response contains a URL of the uploaded image
//       message.success(`${info.file.name} file uploaded successfully`);
//       console.log("Image details : ", productDetails.ProductImage)
//       setProductDetails((prevDetails) => ({
//         ...prevDetails,
//         ProductImage: info.file.originFileObj, // Store the image file
//       }));
//     } else if (info.file.status === "error") {
//       message.error(`${info.file.name} file upload failed.`);
//     }
//   };

//   // Handle form submission
//   const handleProductData = (productDetails) => {
//     // e.preventDefault();
//     const { productId, productTitle, productDescription, productPrice } =
//       productDetails;

//     // if (!productId || !productTitle || !productDescription || !productPrice) {
//     //   alert("Please complete all product details");
//     //   return;
//     // }

//     console.log("Product details:", productDetails);
//     // send to backend
//     message.success("Product added successfully!");
//   };

//   const handleCancel = () => {
//     navigate("/home");
//   };

//   return (
//     <>
//       {/* <SellerNav /> */}
//       <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
//         <Col xs={24} sm={16} md={12} lg={8}>
//           <div
//             className="form"
//             style={{
//               border: "1px solid rgb(40, 60, 92)",
//               padding: "20px",
//               borderRadius: "5px",
//             }}
//           >
//             <Form className="create-form" onFinish={handleProductData}>
//               <h1 className="form-heading">Add Product Details</h1>

//               <Form.Item
//                 label="Product Id"
//                 name="productId"
//                 rules={[
//                   { required: true, message: "Please enter the product ID" },
//                 ]}
//               >
//                 <Input
//                   placeholder="Enter the Product Id"
//                   type="number"
//                   value={productDetails.productId}
//                   onChange={handleChange}
//                 />
//               </Form.Item>

//               <Form.Item
//                 label="Product Title"
//                 name="productTitle"
//                 rules={[
//                   { required: true, message: "Please enter the product title" },
//                 ]}
//               >
//                 <Input
//                   placeholder="Enter the product title"
//                   value={productDetails.productTitle}
//                   onChange={handleChange}
//                 />
//               </Form.Item>

//               <Form.Item
//                 label="Product Description"
//                 name="productDescription"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please enter the product description",
//                   },
//                 ]}
//               >
//                 <Input.TextArea
//                   placeholder="Enter product description"
//                   value={productDetails.productDescription}
//                   onChange={handleChange}
//                 />
//               </Form.Item>

//               <Form.Item
//                 label="Price"
//                 name="productPrice"
//                 rules={[{ required: true, message: "Please enter the price" }]}
//               >
//                 <Input
//                   placeholder="Enter the price"
//                   value={productDetails.productPrice}
//                   onChange={handleChange}
//                 />
//               </Form.Item>

//               <Form.Item
//                 label="Product Brand"
//                 name="productBrand"
//                 rules={[
//                   { required: true, message: "Please enter the product brand" },
//                 ]}
//               >
//                 <Input
//                   placeholder="Enter product brand"
//                   value={productDetails.productBrand}
//                   onChange={handleChange}
//                 />
//               </Form.Item>

//               <Form.Item
//                 label="Product Category"
//                 name="productCategory"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please enter the product category",
//                   },
//                 ]}
//               >
//                 <Input
//                   placeholder="Enter product category"
//                   value={productDetails.productCategory}
//                   onChange={handleChange}
//                 />
//               </Form.Item>
//               <Form.Item
//                 label="Product Image"
//                 name="image"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please upload the product image!",
//                   },
//                 ]}
//               >
//                 <Upload
//                   name="image"
//                   action="/upload" // You can change this to your upload endpoint
//                   listType="picture"
//                   maxCount={1}
//                   onChange={handleImageChange}
//                   beforeUpload={() => false} // Prevent automatic upload
//                 >
//                   <Button icon={<UploadOutlined />}>Click to Upload</Button>
//                 </Upload>
//               </Form.Item>

//               <Form.Item
//                 label="Product Stock"
//                 name="productStock"
//                 rules={[
//                   { required: true, message: "Please enter the product stock" },
//                 ]}
//               >
//                 <Input
//                   placeholder="Product stock"
//                   value={productDetails.productStock}
//                   onChange={handleChange}
//                 />
//               </Form.Item>

//               <Form.Item label="Product Rating" name="productRating">
//                 <Rate
//                   value={productDetails.productRating}
//                   onChange={handleRateChange}
//                 />
//               </Form.Item>

//               <Form.Item>
//                 <Flex gap="small" align="center" style={{ margin: "5px" }}>
//                   <Button
//                     style={{
//                       backgroundColor: "navy",
//                       color: "white",
//                       width: "270px",
//                     }}
//                     type="primary"
//                     htmlType="submit"
//                   >
//                     Add Product
//                   </Button>
//                   <Button
//                     type="primary"
//                     danger
//                     style={{ width: "270px" }}
//                     onClick={handleCancel}
//                   >
//                     Cancel
//                   </Button>
//                 </Flex>
//               </Form.Item>
//             </Form>
//           </div>
//         </Col>
//       </Row>
//     </>
//   );
// };

// export default AddProduct;



import React, { useState } from "react";
import SellerNav from "./SellerNav";
import {
  Button,
  Rate,
  Form,
  Input,
  Row,
  Col,
  Upload,
  message,
  Flex,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { postProduct } from "../../../services/productService";

const AddProduct = () => {
  const [productDetails, setProductDetails] = useState({
    productId: 0,
    productTitle: "",
    productDescription: "",
    productPrice: 0,
    productBrand: "",
    productCategory: "",
    ProductImage: "", // Store base64 image string here
    productStock: 0,
  });

  const navigate = useNavigate();

  // const handleRateChange = (value) => {
  //   setProductDetails((prevDetails) => ({
  //     ...prevDetails,
  //     productRating: value,
  //   }));
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleImageChange = (info) => {
    const file = info.file.originFileObj;
    console.log("image file : ", file)
    if (file) {
      // Convert image to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result; // Base64 encoded image
        setProductDetails((prevDetails) => ({
          ...prevDetails,
          ProductImage: base64Image, // Store base64 image string
        }));
        console.log("image details...", productDetails.ProductImage)
        message.success(`${info.file.name} file uploaded successfully`);
      };

      reader.onerror = () => {
        message.error("File reading failed.");
      };

      reader.readAsDataURL(file); // Start reading the image file as base64
    }
  };

  const handleProductData = async (productDetails) => {
    if(!productDetails){
      console.error("enter all the product details")
    }
    console.log("Product details:", productDetails);
    try{
      const response = await postProduct({productDetails});
      console.log("add product page----------------------->>>")
      console.log("response from postproduct in addproduct page", response.message);
      if(response.message==="product already present in db"){
        message.error(response.message);
        return;
      }
      message.success("Product added successfully!", response.message);
      return;
    }catch(error){
      console.error("error", error);
    }

  };

  const handleCancel = () => {
    navigate("/home");
  };

  return (
    <>
      <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
        <Col xs={24} sm={16} md={12} lg={8}>
          <div
            className="form"
            style={{
              border: "1px solid rgb(40, 60, 92)",
              padding: "20px",
              borderRadius: "5px",
            }}
          >
            <Form className="create-form" onFinish={handleProductData}>
              <h1 className="form-heading">Add Product Details</h1>

              <Form.Item
                label="Product Id"
                name="productId"
                rules={[{ required: true, message: "Please enter the product ID" }]}
              >
                <Input
                  placeholder="Enter the Product Id"
                  type="number"
                  value={productDetails.productId}
                  onChange={handleChange}
                />
              </Form.Item>

              <Form.Item
                label="Product Title"
                name="productTitle"
                rules={[{ required: true, message: "Please enter the product title" }]}
              >
                <Input
                  placeholder="Enter the product title"
                  value={productDetails.productTitle}
                  onChange={handleChange}
                />
              </Form.Item>

              <Form.Item
                label="Product Description"
                name="productDescription"
                rules={[{ required: true, message: "Please enter the product description" }]}
              >
                <Input.TextArea
                  placeholder="Enter product description"
                  value={productDetails.productDescription}
                  onChange={handleChange}
                />
              </Form.Item>

              <Form.Item
                label="Price"
                name="productPrice"
                rules={[{ required: true, message: "Please enter the price" }]}
              >
                <Input
                  placeholder="Enter the price"
                  value={productDetails.productPrice}
                  onChange={handleChange}
                />
              </Form.Item>

              <Form.Item
                label="Product Brand"
                name="productBrand"
                rules={[{ required: true, message: "Please enter the product brand" }]}
              >
                <Input
                  placeholder="Enter product brand"
                  value={productDetails.productBrand}
                  onChange={handleChange}
                />
              </Form.Item>

              <Form.Item
                label="Product Category"
                name="productCategory"
                rules={[{ required: true, message: "Please enter the product category" }]}
              >
                <Input
                  placeholder="Enter product category"
                  value={productDetails.productCategory}
                  onChange={handleChange}
                />
              </Form.Item>

              <Form.Item
                label="Product Image"
                name="image"
                rules={[{ required: true, message: "Please upload the product image!" }]}
              >
                <Upload
                  name="image"
                  listType="picture"
                  maxCount={1}
                  onChange={handleImageChange}
                  beforeUpload={() => false} // Prevent automatic upload
                >
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Form.Item>

              <Form.Item
                label="Product Stock"
                name="productStock"
                rules={[{ required: true, message: "Please enter the product stock" }]}
              >
                <Input
                  placeholder="Product stock"
                  value={productDetails.productStock}
                  onChange={handleChange}
                />
              </Form.Item>

              {/* <Form.Item label="Product Rating" name="productRating">
                <Rate
                  value={productDetails.productRating}
                  onChange={handleRateChange}
                />
              </Form.Item> */}

              <Form.Item>
                <Flex gap="small" align="center" style={{ margin: "5px" }}>
                  <Button
                    style={{
                      backgroundColor: "navy",
                      color: "white",
                      width: "270px",
                    }}
                    type="primary"
                    htmlType="submit"
                  >
                    Add Product
                  </Button>
                  <Button
                    type="primary"
                    danger
                    style={{ width: "270px" }}
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                </Flex>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default AddProduct;
