import React, { useEffect, useState } from "react";
import SellerNav from "./SellerNav";
import { Button, Rate, Form, Input, Row, Col, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const AddProduct = () => {
  const [productDetails, setProductDetails] = useState({
    productId: 0,
    productTitle: "",
    productDescription: "",
    productPrice: 0,
    productBrand: "",
    productCategory: "",
    ProductImage: "", // Store the image URL or file name here
    productStock: 0,
    productRating: 3,
  });

  const handleRateChange = (value) => {
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      productRating: value,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleImageChange = (info) => {
    if (info.file.status === "done") {
      // Assuming the response contains a URL of the uploaded image
      message.success(`${info.file.name} file uploaded successfully`);
      setProductDetails((prevDetails) => ({
        ...prevDetails,
        ProductImage: info.file.originFileObj, // Store the image file
      }));
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  // Handle form submission
  const handleProductData = (productDetails) => {
    // e.preventDefault();
    const { productId, productTitle, productDescription, productPrice } =
      productDetails;

    // if (!productId || !productTitle || !productDescription || !productPrice) {
    //   alert("Please complete all product details");
    //   return;
    // }

    console.log("Product details:", productDetails);
    // send to backend
    message.success("Product added successfully!");
  };

  return (
    <>
      <SellerNav />
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
            <Form
              className="create-form"
              onFinish={handleProductData} // Use onFinish instead of onSubmitCapture
            >
              <h1 className="form-heading">Add Product Details</h1>

              <Form.Item
                label="Product Id"
                name="productId"
                rules={[
                  { required: true, message: "Please enter the product ID" },
                ]}
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
                rules={[
                  { required: true, message: "Please enter the product title" },
                ]}
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
                rules={[
                  {
                    required: true,
                    message: "Please enter the product description",
                  },
                ]}
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
                rules={[
                  { required: true, message: "Please enter the product brand" },
                ]}
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
                rules={[
                  {
                    required: true,
                    message: "Please enter the product category",
                  },
                ]}
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
                rules={[
                  {
                    required: true,
                    message: "Please upload the product image!",
                  },
                ]}
              >
                <Upload
                  name="image"
                  action="/upload" // You can change this to your upload endpoint
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
                rules={[
                  { required: true, message: "Please enter the product stock" },
                ]}
              >
                <Input
                  placeholder="Product stock"
                  value={productDetails.productStock}
                  onChange={handleChange}
                />
              </Form.Item>

              <Form.Item label="Product Rating" name="productRating">
                <Rate
                  value={productDetails.productRating}
                  onChange={handleRateChange}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  style={{ backgroundColor: "navy", color: "white" }}
                >
                  Add Product
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default AddProduct;
