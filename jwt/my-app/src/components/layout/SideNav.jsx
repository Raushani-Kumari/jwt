import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import React from "react";
import { Link } from "react-router-dom";
import { sideNavConfig } from "../../config/navConfig";
const siderStyle = {
  position: "sticky",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "navy",
};
export default function SideNav() {
  const items1 = sideNavConfig.map(({ key, label, link, icon }) => ({
    key,
    // extra: <UserOutlined />,
    label: <Link to={link}>{label}</Link>,
    icon
  }));
  return (
    <Sider width="20%" style={siderStyle}>
      <Menu
        // theme="dark"
        multiple={false}
        mode={"vertical"}
        // defaultSelectedKeys={["2"]}
        items={items1}
        style={{
          flex: 1,
          minWidth: 0,
          backgroundColor: "inherit",
          // color: "#fff",
          color: "white",
        }}
      />
    </Sider>
  );
}
