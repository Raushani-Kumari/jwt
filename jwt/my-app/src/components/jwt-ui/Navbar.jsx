import React, { useContext, useState, useEffect } from "react";
import { Layout, Menu, Dropdown, Avatar, Button, Drawer } from "antd";
import { UserOutlined, MenuOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import Logout from "./Logout";
import { navConfig } from "../../config/navConfig";

const { Header } = Layout;

const Navbar = () => {
  const [visibleDrawer, setVisibleDrawer] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const profileMenu = (
    <Menu style={{ width: "300px" }}>
      <Menu.Item
        key="1"
        disabled
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "16px",
          color: "black",
        }}
      >
        {user.username}
      </Menu.Item>
      <Menu.Item
        key="2"
        disabled
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "14px",
          color: "#666",
        }}
      >
        {user.email}
      </Menu.Item>
      <Menu.Item
        key="3"
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "14px",
          color: "#666",
        }}
      >
        <Button>
          <Link to="/profile">Edit your Profile</Link>
        </Button>
      </Menu.Item>
      <Menu.Item key="4" style={{ textAlign: "center", margin: "15px" }}>
        <Button style={{ backgroundColor: "navy", color: "white" }}>
          <Logout />
        </Button>
      </Menu.Item>
    </Menu>
  );

  const NavMenu = () => {
    const items1 = navConfig.map(({ key, label, link }) => ({
      key,
      // extra: <UserOutlined />,
      label: <Link to={link}>{label}</Link>,
    }));

    return (
      <Menu
        theme="dark"
        multiple={false}
        mode="horizontal"
        // defaultSelectedKeys={["2"]}
        items={items1}
        style={{ flex: 1, minWidth: 0 }}
      />
    );
  };

  const showDrawer = () => {
    setVisibleDrawer(true);
  };

  const onCloseDrawer = () => {
    setVisibleDrawer(false);
  };

  return (
    <Layout>
      <Header
        style={{
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 20px",
        }}
      >
        {isMobile && (
          <Button
            type="primary"
            icon={<MenuOutlined />}
            onClick={showDrawer}
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "white",
              padding: 0,
            }}
          />
        )}
        <div
          className="logo"
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            color: "white",
            flex: 1,
            textAlign: isMobile ? "center" : "left",
          }}
        >
          ECOMMERCE
        </div>
        {!isMobile && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              flex: 1,
            }}
          >
            <NavMenu/>
            {/* <Menu theme="dark" mode="horizontal" style={{ margin: "8px" }}>
              <Menu.Item key="1">
                <Link to="/home" style={{ color: "white" }}>
                  Home
                </Link>
              </Menu.Item>
            </Menu>
            <Menu theme="dark" style={{ margin: "8px" }}>
              <Menu.Item key="2">
                <Link to="/about" style={{ color: "white" }}>
                  About Us
                </Link>
              </Menu.Item>
            </Menu>
            <Menu theme="dark" style={{ margin: "8px" }}>
              <Menu.Item key="3">
                <Link to="/contact" style={{ color: "white" }}>
                  Contact Us
                </Link>
              </Menu.Item>
            </Menu> */}
          </div>
        )}
        <Dropdown overlay={profileMenu} trigger={["click"]}>
          <Avatar
            style={{
              cursor: "pointer",
              backgroundColor: "white",
              color: "#001f3d",
            }}
            icon={<UserOutlined />}
          />
        </Dropdown>
      </Header>

      <Drawer
        title="Navigation"
        placement="left"
        onClose={onCloseDrawer}
        open={visibleDrawer}
      >
        <Menu>
          <Menu.Item key="1">
            <Link to="/home">Home</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/about">About Us</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/contact">Contact Us</Link>
          </Menu.Item>
        </Menu>
      </Drawer>
    </Layout>
  );
};

export default Navbar;
