import React, { useState } from "react";
import { Button, Flex, Space, Table, Tag } from "antd";
import AddProduct from "./seller/AddProduct";
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];
// fetch the data from backend using get

const Products = () => {
  const [showProductForm, setShowProductForm] = useState(false);
  const [viewProducts, setViewProducts] = useState(false);

  const handleProductForm = () => {
    setShowProductForm(true);
    setViewProducts(false);
  };

  const handleViewProducts = () => {
    setViewProducts(true); 
    setShowProductForm(false);
  };

  return (
    <Flex flex="1 1 100px" style={{ padding: "1rem" }} vertical>
      <Flex align="center" gap="middle" style={{ padding: "1rem 0" }}>
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
        <AddProduct showProductForm={true} />
      ) : (
        <Table style={{ flexGrow: 1 }} columns={columns} dataSource={data} />
      )}
      {/* <Table style={{ flexGrow: 1 }} columns={columns} dataSource={data} /> */}
    </Flex>
  );
};

export default Products;
