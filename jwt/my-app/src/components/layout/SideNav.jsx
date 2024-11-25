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
    label: <Link to={link}>{label}</Link>,
    icon
  }));
  return (
    <Sider width="15%" style={siderStyle}>
      <Menu
        multiple={false}
        mode={"vertical"}
        items={items1}
        style={{
          flex: 1,
          minWidth: 0,
          backgroundColor: "inherit",
          color: "white",
        }}
      />
    </Sider>
  );
}
