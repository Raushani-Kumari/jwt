import React, { useEffect, useState } from "react";
import { Button, Flex, Image, Space, Table, Modal } from "antd";
import AddProduct from "./seller/AddProduct";
import { message } from "antd";
import { deleteProduct, updateProduct } from "../../services/productService";

const API_PATH = "http://localhost:8080/api";

const Products = () => {
  const [showProductForm, setShowProductForm] = useState(false);
  const [viewProducts, setViewProducts] = useState(false);
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null); // Track the product being edited
  const [isModalVisible, setIsModalVisible] = useState(false); // To control modal visibility

  useEffect(() => {
    fetch(`${API_PATH}/products`)
      .then((response) => response.json())
      .then((data) => {
        console.log(
          "data in useEffect after fetching products..........",
          data
        );
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  }, []);
  const columns = [
    {
      title: "Product Title",
      dataIndex: "productTitle",
      key: "productTitle",
    },
    {
      title: "Description",
      dataIndex: "productDescription",
      key: "productDescription",
    },
    {
      title: "Price",
      dataIndex: "productPrice",
      key: "productPrice",
    },
    {
      title: "Brand",
      dataIndex: "productBrand",
      key: "productBrand",
    },
    {
      title: "Category",
      dataIndex: "productCategory",
      key: "productCategory",
    },
    {
      title: "Stock",
      dataIndex: "productStock",
      key: "productStock",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        // {image && (
        <Image
        width={80}
          src={`data:image/jpeg;base64,${image.data}`}
          alt='product image'
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space>
          <Button
            style={{ backgroundColor: "navy" }}
            onClick={() => handleEdit(record)}
            type="primary"
          >
            Edit
          </Button>
          <Button
            style={{ backgroundColor: "red", color: "white" }}
            onClick={() => handleDelete(record)}
            type="danger"
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleProductForm = () => {
    setShowProductForm(true);
    setViewProducts(false);
  };

  const handleViewProducts = () => {
    setViewProducts(true);
    setShowProductForm(false);
  };

  const handleEdit = (product) => {
    setEditingProduct(product); // Set the product to be edited
    console.log("product to be edited : ", editingProduct)
    setIsModalVisible(true); // Show the modal with the form
  };

  const handleDelete = (product) => {
    Modal.confirm({
      title: "Are you sure you want to delete this product?",
      content: `Product: ${product.productTitle}`,
      onOk: () => {
        handleDeleteProduct(product._id);
      },
    });
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const response = await deleteProduct(productId); // Pass the product ID
      console.log("response after deleting : ", response);
      setProducts(
        products.filter((product) => product._id !== productId) // Filter out the deleted product from state
      );
      message.success("Product deleted successfully");
    } catch (error) {
      message.error("Error in deleting product: ", error);
    }
  };
  const handleUpdate = async (updatedProduct) => {
    try {
      const response = await updateProduct(updatedProduct); // Pass the full product object, including the ID
      console.log("response after calling updateproduct: ", response);
      setProducts(
        products.map(
          (product) => (product._id === updatedProduct._id ? response : product) // Replacing the updated product 
        )
      );
      setIsModalVisible(false);
    } catch (error) {
      console.error("error........", error);
    }
  };

  return (
    <Flex flex="1 1 100px" style={{ padding: "1rem" }} vertical>
      <Flex align="center" gap="middle" style={{ padding: "10px" }}>
        <Button
          type="primary"
          style={{ backgroundColor: "navy" }}
          onClick={handleProductForm}
        >
          Add Product
        </Button>
        <Button
          type="primary"
          style={{ backgroundColor: "navy" }}
          onClick={handleViewProducts}
        >
          Reload
        </Button>
      </Flex>
      {showProductForm ? (
        <AddProduct productId = {editingProduct} showProductForm={true} />
      ) : (
        <Table
          style={{
            flexGrow: 1,
            boxShadow:
              "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
          }}
          columns={columns}
          dataSource={products}
        />
      )}

      {/* Modal to Edit Product */}
      <Modal
        // title="Edit Product"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null} // We will add the footer manually to control the buttons
        destroyOnClose // Ensure modal is cleaned up when closed
      >
        <AddProduct
          showProductForm={true}
          productId={editingProduct} // Pass product data for editing
          onSubmit={handleUpdate} // Handle form submission (update product)
        />
      </Modal>
    </Flex>
  );
};

export default Products;
