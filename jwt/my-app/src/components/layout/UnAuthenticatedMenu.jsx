import { Button, Flex, Input } from "antd";
import { useWatch } from "antd/es/form/Form";
import React, { useContext } from "react";
import useWidth from "../hooks/useWidth";
import { Link } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";
import useAuthModel from "../hooks/useAuthModel";
import { AuthModelContext } from "../../context/AuthModelContext";

export default function UnAuthenticatedMenu() {
  const { setShowAuthModel } = useContext(AuthModelContext);
  const { isMobile } = useWidth();
  return (
    // return 3 element in a flex
    <Flex
      gap={2}
      flex="1 1 100px"
      mode={isMobile ? "vertical" : "horizontal"}
      // style={{padding:"5px", margin: "5px"}}
      justify="space-between"
      style={{ flexGrow: 1 }}
    >
      <Flex align="center" style={{ margin: "0 10px", flexBasis: "240px" }}>
        <Input style={{ height: 32 }} placeholder="Search" />
      </Flex>
      <Flex gap={5} vertical={false} justify="space-between" align="center">
        <Button
          ghost
          onClick={() => {
            console.log("hellow");

            setShowAuthModel(true);
          }}
        >
          Login
        </Button>
        <Button ghost>
          <ShoppingCartOutlined />
        </Button>
        <div style={{ marginLeft: "1rem" }}>
          <Button ghost>
            <Link to="/login?usertype=seller"> Become a Seller</Link>
          </Button>
        </div>
      </Flex>
    </Flex>
  );
}
