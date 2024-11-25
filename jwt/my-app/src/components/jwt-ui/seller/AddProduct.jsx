// import React, { useState } from "react";
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
// import { postProduct } from "../../../services/productService";

// const AddProduct = ({ showProductForm }) => {
//   const [productDetails, setProductDetails] = useState({
//     productId: 0,
//     productTitle: "",
//     productDescription: "",
//     productPrice: 0,
//     productBrand: "",
//     productCategory: "",
//     ProductImage: "", // Store base64 image string here
//     productStock: 0,
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProductDetails((prevDetails) => ({
//       ...prevDetails,
//       [name]: value,
//     }));
//   };

//   const handleImageChange = (info) => {
//     const file = info.file.originFileObj;
//     console.log("image file : ", file);
//     if (file) {
//       // Convert image to base64
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const base64Image = reader.result; // Base64 encoded image
//         setProductDetails((prevDetails) => ({
//           ...prevDetails,
//           ProductImage: base64Image, // Store base64 image string
//         }));
//         console.log("image details...", productDetails.ProductImage);
//         message.success(`${info.file.name} file uploaded successfully`);
//       };

//       reader.onerror = () => {
//         message.error("File reading failed.");
//       };

//       reader.readAsDataURL(file); // Start reading the image file as base64
//     }
//   };

//   const handleProductData = async (productDetails) => {
//     if (!productDetails) {
//       console.error("enter all the product details");
//     }
//     console.log("Product details:", productDetails);
//     try {
//       const response = await postProduct({ productDetails });
//       console.log("add product page----------------------->>>");
//       console.log(
//         "response from postproduct in addproduct page",
//         response.message
//       );
//       if (response.message === "product already present in db") {
//         message.error(response.message);
//         return;
//       }
//       message.success("Product added successfully!", response.message);
//       return;
//     } catch (error) {
//       console.error("error", error);
//     }
//   };

//   const handleCancel = () => {
//     navigate("/home");
//   };

//   const renderaddProductForm = () => {
//     <div
//       className="form"
//       style={{
//         border: "1px solid rgb(40, 60, 92)",
//         padding: "20px",
//         borderRadius: "5px",
//       }}
//     >
//       <Form className="create-form" onFinish={handleProductData}>
//         <h1 className="form-heading">Add Product Details</h1>

//         <Form.Item
//           label="Product Id"
//           name="productId"
//           rules={[{ required: true, message: "Please enter the product ID" }]}
//         >
//           <Input
//             placeholder="Enter the Product Id"
//             type="number"
//             value={productDetails.productId}
//             onChange={handleChange}
//           />
//         </Form.Item>

//         <Form.Item
//           label="Product Title"
//           name="productTitle"
//           rules={[
//             { required: true, message: "Please enter the product title" },
//           ]}
//         >
//           <Input
//             placeholder="Enter the product title"
//             value={productDetails.productTitle}
//             onChange={handleChange}
//           />
//         </Form.Item>

//         <Form.Item
//           label="Product Description"
//           name="productDescription"
//           rules={[
//             {
//               required: true,
//               message: "Please enter the product description",
//             },
//           ]}
//         >
//           <Input.TextArea
//             placeholder="Enter product description"
//             value={productDetails.productDescription}
//             onChange={handleChange}
//           />
//         </Form.Item>

//         <Form.Item
//           label="Price"
//           name="productPrice"
//           rules={[{ required: true, message: "Please enter the price" }]}
//         >
//           <Input
//             placeholder="Enter the price"
//             value={productDetails.productPrice}
//             onChange={handleChange}
//           />
//         </Form.Item>

//         <Form.Item
//           label="Product Brand"
//           name="productBrand"
//           rules={[
//             { required: true, message: "Please enter the product brand" },
//           ]}
//         >
//           <Input
//             placeholder="Enter product brand"
//             value={productDetails.productBrand}
//             onChange={handleChange}
//           />
//         </Form.Item>

//         <Form.Item
//           label="Product Category"
//           name="productCategory"
//           rules={[
//             {
//               required: true,
//               message: "Please enter the product category",
//             },
//           ]}
//         >
//           <Input
//             placeholder="Enter product category"
//             value={productDetails.productCategory}
//             onChange={handleChange}
//           />
//         </Form.Item>

//         <Form.Item
//           label="Product Image"
//           name="image"
//           rules={[
//             {
//               required: true,
//               message: "Please upload the product image!",
//             },
//           ]}
//         >
//           <Upload
//             name="image"
//             listType="picture"
//             maxCount={1}
//             onChange={handleImageChange}
//             beforeUpload={() => false} // Prevent automatic upload
//           >
//             <Button icon={<UploadOutlined />}>Click to Upload</Button>
//           </Upload>
//         </Form.Item>

//         <Form.Item
//           label="Product Stock"
//           name="productStock"
//           rules={[
//             { required: true, message: "Please enter the product stock" },
//           ]}
//         >
//           <Input
//             placeholder="Product stock"
//             value={productDetails.productStock}
//             onChange={handleChange}
//           />
//         </Form.Item>

//         <Form.Item>
//           <Flex gap="small" align="center" style={{ margin: "5px" }}>
//             <Button
//               style={{
//                 backgroundColor: "navy",
//                 color: "white",
//                 width: "270px",
//               }}
//               type="primary"
//               htmlType="submit"
//             >
//               Add Product
//             </Button>
//             <Button
//               type="primary"
//               danger
//               style={{ width: "270px" }}
//               onClick={handleCancel}
//             >
//               Cancel
//             </Button>
//           </Flex>
//         </Form.Item>
//       </Form>
//     </div>;
//   };
//   return (
//     <>
//       {showProductForm === true ? (
//         renderaddProductForm
//       ) : (
//       <Row
//         justify="center"
//         align="middle"
//         style={{ minHeight: showProductForm === true ? "auto" : "100vh" }}
//       >
//         <Col xs={24} sm={16} md={12} lg={8}>
//           {renderaddProductForm}
//         </Col>
//       </Row>
//        )} 
//     </>
//   );
// };

// export default AddProduct;



import React, { useState } from "react";
import {
  Button,
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

const AddProduct = ({ showProductForm }) => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleImageChange = (info) => {
    const file = info.file.originFileObj;
    if (file) {
      // Convert image to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result; // Base64 encoded image
        setProductDetails((prevDetails) => ({
          ...prevDetails,
          ProductImage: base64Image, // Store base64 image string
        }));
        message.success(`${info.file.name} file uploaded successfully`);
      };

      reader.onerror = () => {
        message.error("File reading failed.");
      };

      reader.readAsDataURL(file); // Start reading the image file as base64
    }
  };

  const handleProductData = async () => {
    console.log("productDetails : ", productDetails)
    if (!productDetails) {
      console.error("Enter all the product details");
    }
    try {
      const response = await postProduct({ productDetails });
      if (response.message === "product already present in db") {
        message.error(response.message);
        return;
      }
      message.success("Product added successfully!");
      navigate("/product"); // Redirect to home after product is added
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleCancel = () => {
    navigate("/product");
  };

  const renderaddProductForm = () => {
    return (
      <div
        className="form"
        style={{
          // border: "1px solid rgb(40, 60, 92)",
          border: "none",
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

          <Form.Item>
            <Flex gap="small" align="center" justify="center" style={{ margin: "5px" }}>
              <Button
              style={{
                width:"50%"
              }}
                type="primary"
                danger
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                style={{
                  backgroundColor: "navy",
                  color: "white",
                  // minWidth: "270px",
                  width:"50%"
                }}
                type="primary"
                htmlType="submit"
              >
                Add Product
              </Button>
            </Flex>
          </Form.Item>
        </Form>
      </div>
    );
  };

  return <>{showProductForm && renderaddProductForm()}</>;
};

export default AddProduct;
