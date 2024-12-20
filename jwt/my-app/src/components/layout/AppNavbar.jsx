import React, { useContext, useState } from "react";
import { Avatar, Button, Drawer, Menu, Typography } from "antd";
import { Flex, Layout, Progress, Spin } from "antd";
import { MenuOutlined, ShopOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { navConfig } from "../../config/navConfig";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import useWidth from "../hooks/useWidth";
import NavMenu from "./NavMenu";
import { UserContext } from "../../context/UserContext";
import Logout from "../jwt-ui/Logout";
import UnAuthenticatedMenu from "./UnAuthenticatedMenu";
import ViewByAuth from "../../routes/ViewByAuth";

const { Header, Footer, Sider, Content } = Layout;
const { Title, Text } = Typography;

const headerStyle = {
  // textAlign: "center",
  // color: "#fff",
  boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
  zIndex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  height: 64,
  lineHeight: "64px",
  backgroundColor: "navy",
};

export default function AppNavbar() {
  const [visibleDrawer, setVisibleDrawer] = useState(false);
  const { user } = useContext(UserContext);
  const { isMobile } = useWidth();
  const items = [
    {
      label: (
        <Flex vertical={false}>
          <Avatar
            style={{
              width: "5rem",
              height: "5rem",
              fontSize: "30px",
              cursor: "pointer",
              backgroundColor: "#eee",
              color: "#001f3d",
            }}
            icon={<UserOutlined />}
          />
          <Flex style={{ padding: "0.5rem 1rem" }} vertical>
            <Title style={{ margin: 0 }} level={5}>
              {user.username}
            </Title>
            <Text type="secondary">{user.email}</Text>
          </Flex>
        </Flex>
      ),
      key: "0",
    },
    {
      label: <Link to="/profile">Account Settings</Link>,
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: <Logout />,
      key: "3",
    },
  ];
  return (
    <Header
      style={{ ...headerStyle, ...{ paddingInline: isMobile ? 12 : 48 } }}
    >
      {isMobile && (
        <Button
          type="primary"
          icon={<MenuOutlined />}
          onClick={() => setVisibleDrawer(true)}
          style={{
            backgroundColor: "transparent",
            border: "none",
            color: "white",
            padding: 0,
          }}
        />
      )}
      <Flex vertical={false} flex="1 1 100px">
        {!isMobile && (
          <ShopOutlined style={{ fontSize: "32px", color: "#fff" }} />
        )}
        <Title
          style={{
            alignSelf: "center",
            margin: 0,
            color: "#fff",
            padding: "0.5rem 1rem",
          }}
          level={3}
        >
          Ecommerce
        </Title>
        <ViewByAuth viewOnAuth={true}>{!isMobile && <NavMenu />}</ViewByAuth>
        <ViewByAuth viewOnAuth={false}>
          <UnAuthenticatedMenu />
        </ViewByAuth>
      </Flex>
      <ViewByAuth viewOnAuth={true}>
        <Dropdown menu={{ items }} trigger={["click"]}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <Avatar
                style={{
                  width: "3rem",
                  height: "3rem",
                  fontSize: "24px",
                  cursor: "pointer",
                  backgroundColor: "white",
                  // color: "#001f3d",
                  color: "navy",
                }}
                icon={<UserOutlined />}
              />
            </Space>
          </a>
        </Dropdown>
      </ViewByAuth>
      <Drawer
        title="Navigation"
        placement="left"
        style={{ backgroundColor: "navy" }}
        onClose={() => setVisibleDrawer(false)}
        open={visibleDrawer}
      >
        <NavMenu />
      </Drawer>
    </Header>
  );
}
