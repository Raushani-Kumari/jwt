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

// import React, { useEffect, useState } from "react";
// import { Button, Form, Input, Row, Col, Upload, message, Flex } from "antd";
// import { UploadOutlined } from "@ant-design/icons";
// import { useNavigate } from "react-router-dom";
// import { postProduct } from "../../../services/productService";

// const AddProduct = ({ showProductForm }) => {
//   const [productDetails, setProductDetails] = useState({
//     // productId: "",
//     productTitle: "",
//     productDescription: "",
//     productPrice: "",
//     productBrand: "",
//     productCategory: "",
//     image: "", // Store base64 image string here
//     productStock: "",
//   });
//   useEffect(() => {
//     console.log("Updated product details:", productDetails);
//   }, [productDetails]);

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
//     console.log("productDetails : ", productDetails, file);
//     if (file) {
//       // Convert image to base64
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         const base64Image = reader.result; // Base64 encoded image
//         console.log("base64 image", base64Image);
//         setProductDetails((prevDetails) => ({
//           ...prevDetails,
//           image: base64Image, // Store base64 image string
//         }));
//         // message.success(`${info.file.name} file uploaded successfully`);
//       };

//       reader.onerror = () => {
//         message.error("File reading failed.");
//       };

//       reader.readAsDataURL(file); // Start reading the image file as base64
//     }
//   };

//   const handleProductData = async () => {
//     console.log("productDetails : ", productDetails);
//     if (
//       // !productDetails.productId ||
//       !productDetails.productTitle ||
//       !productDetails.productDescription ||
//       !productDetails.productPrice ||
//       !productDetails.productBrand ||
//       !productDetails.productCategory ||
//       !productDetails.image ||
//       !productDetails.productStock
//     ) {
//       message.error("Enter all the product details");
//     }
//     try {
//       const response = await postProduct({ productDetails });
//       console.log("response when posted from ui", response);
//       message.success("Product added successfully!");
//       navigate("/products"); // Redirect to home after product is added
//     } catch (error) {
//       console.error("Error adding product:", error);
//     }
//   };

//   const handleCancel = () => {
//     navigate("/products");
//   };

//   const renderaddProductForm = () => {
//     return (
//       <div
//         className="form"
//         style={{
//           // border: "1px solid rgb(40, 60, 92)",

//           border: "none",
//           padding: "20px",
//           borderRadius: "5px",
//         }}
//       >
//         <Form className="create-form" onFinish={handleProductData}>
//           <h1 className="form-heading">Add Product Details</h1>
//           {/* <Form.Item
//             label="Product Id"
//             name="productId"
//             rules={[{ required: true, message: "Please enter the product ID" }]}
//           >
//             <Input
//               name="productId"
//               placeholder="Enter the Product Id"
//               type="number"
//               value={productDetails.productId}
//               onChange={handleChange}
//             />
//           </Form.Item> */}
//           <Form.Item
//             label="Product Title"
//             rules={[
//               { required: true, message: "Please enter the product title" },
//             ]}
//           >
//             <Input
//               name="productTitle"
//               placeholder="Enter the product title"
//               value={productDetails.productTitle}
//               onChange={handleChange}
//             />
//           </Form.Item>
//           <Form.Item
//             label="Product Description"
//             rules={[
//               {
//                 required: true,
//                 message: "Please enter the product description",
//               },
//             ]}
//           >
//             <Input.TextArea
//               name="productDescription"
//               placeholder="Enter product description"
//               value={productDetails.productDescription}
//               onChange={handleChange}
//             />
//           </Form.Item>
//           <Form.Item
//             label="Price"
//             rules={[{ required: true, message: "Please enter the price" }]}
//           >
//             <Input
//               name="productPrice"
//               placeholder="Enter the price"
//               value={productDetails.productPrice}
//               onChange={handleChange}
//             />
//           </Form.Item>
//           <Form.Item
//             label="Product Brand"
//             rules={[
//               { required: true, message: "Please enter the product brand" },
//             ]}
//           >
//             <Input
//               name="productBrand"
//               placeholder="Enter product brand"
//               value={productDetails.productBrand}
//               onChange={handleChange}
//             />
//           </Form.Item>
//           <Form.Item
//             label="Product Category"
//             rules={[
//               { required: true, message: "Please enter the product category" },
//             ]}
//           >
//             <Input
//               name="productCategory"
//               placeholder="Enter product category"
//               value={productDetails.productCategory}
//               onChange={handleChange}
//             />
//           </Form.Item>
//           <Form.Item
//             label="Product Image"
//             name="image"
//             rules={[
//               { required: true, message: "Please upload the product image!" },
//             ]}
//           >
//             <Upload
//               name="image"
//               listType="picture"
//               maxCount={1}
//               onChange={handleImageChange}
//               beforeUpload={() => false}
//             >
//               <Button icon={<UploadOutlined />}>Click to Upload</Button>
//             </Upload>
//           </Form.Item>
//           <Form.Item
//             label="Product Stock"
//             rules={[
//               { required: true, message: "Please enter the product stock" },
//             ]}
//           >
//             <Input
//               name="productStock"
//               placeholder="Product stock"
//               value={productDetails.productStock}
//               onChange={handleChange}
//             />
//           </Form.Item>
//           <Form.Item>
//             <Flex
//               gap="small"
//               align="center"
//               justify="center"
//               style={{ margin: "5px" }}
//             >
//               <Button
//                 style={{
//                   width: "30%",
//                 }}
//                 type="primary"
//                 danger
//                 onClick={handleCancel}
//               >
//                 Cancel
//               </Button>
//               <Button
//                 style={{
//                   backgroundColor: "navy",
//                   color: "white",
//                   // minWidth: "270px",
//                   width: "30%",
//                 }}
//                 type="primary"
//                 htmlType="submit"
//               >
//                 Add Product
//               </Button>
//             </Flex>
//           </Form.Item>
//         </Form>
//       </div>
//     );
//   };

//   return <>{showProductForm && renderaddProductForm()}</>;
// };

// export default AddProduct;

import React, { useEffect, useState } from "react";
import { Button, Form, Input, Upload, message, Flex, List } from "antd";
import { DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { postProduct, updateProduct } from "../../../services/productService";

const AddProduct = ({ productId, showProductForm, product, onSubmit }) => {
  const [productDetails, setProductDetails] = useState({
    productTitle: "",
    productDescription: "",
    productPrice: "",
    productBrand: "",
    productCategory: "",
    image: "",
    productStock: "",
  });
  const [fileList, setFileList] = useState([]);
  const API_PATH = "http://localhost:8080/api";
  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      // Pre-fill the form fields if we're editing a product
      setProductDetails({
        productTitle: product.productTitle || "",
        productDescription: product.productDescription || "",
        productPrice: product.productPrice || "",
        productBrand: product.productBrand || "",
        productCategory: product.productCategory || "",
        image: product.image || "",
        productStock: product.productStock || "",
      });
    }

    // console.log("editing product in useeffect.................", productId)
  }, [product]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleBeforeUpload = async (file) => {
    console.log("before upload is called...");
    const base64 = await getBase64(file);
    // setImageBase64(base64);
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      image: base64, // Store base64 image string
    }));
    setFileList([file]);
    return false; // Prevent upload
  };

  const handleRemove = () => {
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      image: "",
    }));
    setFileList([]);
  };

  const handleProductData = async () => {
    if (
      !productDetails.productTitle ||
      !productDetails.productDescription ||
      !productDetails.productPrice ||
      !productDetails.productBrand ||
      !productDetails.productCategory ||
      !productDetails.image ||
      !productDetails.productStock
    ) {
      message.error("Enter all the product details");
      return;
    }

    // Pass the product details to the onSubmit function (either add or update)
    // call the update api here
    // since i am using same addproductform, it is executing this whole func--->>>leading to creating new product instead of updating
    // need to segregate the logic for adding product and updating product --> then it will function
    if (onSubmit) {
      onSubmit(productId);
      console.log("produtc for update : ", productId)
      // console.log("product id for updation : ", editingProduct._id)
      try {
        const updatedResponse = await updateProduct({ productId});
        console.log(
          "posting product data to be updated at the backend : ",
          updatedResponse
        );
        message.success("product updated");
        navigate("/products");
      } catch (error) {
        console.error("error in updating the product : ", error);
      }
    } else {
      try {
        const response = await postProduct({ productDetails });
        console.log("response when posted from ui", response);
        message.success("Product added successfully!");
        navigate("/products"); // Redirect to home after product is added
      } catch (error) {
        console.error("Error adding product:", error);
      }
    }
  };

  const handleCancel = () => {
    navigate("/products");
  };

  const renderAddProductForm = () => {
    return (
      <div className="form" style={{ padding: "20px", borderRadius: "5px" }}>
        <Form className="create-form" onFinish={handleProductData}>
          <h1 className="form-heading">
            {product ? "Edit Product" : "Add Product"}
          </h1>

          <Form.Item
            label="Product Title"
            rules={[
              { required: true, message: "Please enter the product title" },
            ]}
          >
            <Input
              name="productTitle"
              placeholder="Enter the product title"
              value={productDetails.productTitle}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item
            label="Product Description"
            rules={[
              {
                required: true,
                message: "Please enter the product description",
              },
            ]}
          >
            <Input.TextArea
              name="productDescription"
              placeholder="Enter product description"
              value={productDetails.productDescription}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item
            label="Price"
            rules={[{ required: true, message: "Please enter the price" }]}
          >
            <Input
              name="productPrice"
              placeholder="Enter the price"
              value={productDetails.productPrice}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item
            label="Product Brand"
            rules={[
              { required: true, message: "Please enter the product brand" },
            ]}
          >
            <Input
              name="productBrand"
              placeholder="Enter product brand"
              value={productDetails.productBrand}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item
            label="Product Category"
            rules={[
              { required: true, message: "Please enter the product category" },
            ]}
          >
            <Input
              name="productCategory"
              placeholder="Enter product category"
              value={productDetails.productCategory}
              onChange={handleChange}
            />
          </Form.Item>

          {/* disply the product image added and a delete button to delete and select another image */}

          <Form.Item
            name="upload"
            label="Upload"
            valuePropName="fileList"
            getValueFromEvent={() => fileList}
          >
            <Upload
              beforeUpload={handleBeforeUpload}
              fileList={fileList}
              maxCount={1}
              onRemove={handleRemove}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
            {fileList.length > 0 && (
              <List
                itemLayout="horizontal"
                dataSource={fileList}
                renderItem={(file) => (
                  <List.Item
                    actions={[
                      <Button
                        type="link"
                        icon={<DeleteOutlined />}
                        onClick={handleRemove}
                      >
                        Delete
                      </Button>,
                    ]}
                  >
                    <List.Item.Meta title={file.name} />
                  </List.Item>
                )}
              />
            )}
          </Form.Item>
          <Form.Item
            label="Product Stock"
            rules={[
              { required: true, message: "Please enter the product stock" },
            ]}
          >
            <Input
              name="productStock"
              placeholder="Product stock"
              value={productDetails.productStock}
              onChange={handleChange}
            />
          </Form.Item>

          <Form.Item>
            <Flex
              gap="small"
              align="center"
              justify="center"
              style={{ margin: "5px" }}
            >
              <Button
                style={{ width: "30%" }}
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
                  width: "30%",
                }}
                type="primary"
                htmlType="submit"
              >
                {product ? "Update" : "Add"} Product
              </Button>
            </Flex>
          </Form.Item>
        </Form>
      </div>
    );
  };

  return <>{showProductForm && renderAddProductForm()}</>;
};

export default AddProduct;
