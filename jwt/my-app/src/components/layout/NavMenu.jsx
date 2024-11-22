import { Menu } from "antd";
import { navConfig } from "../../config/navConfig";
import useWidth from "../hooks/useWidth";
import { Link } from "react-router-dom";

export default function NavMenu() {
  const { isMobile } = useWidth();

  const items1 = navConfig.map(({ key, label, link }) => ({
    key,
    // extra: <UserOutlined />,
    label: <Link to={link}>{label}</Link>,
  }));

  return (
    <Menu
      // theme="dark"
      multiple={false}
      mode={isMobile ? "vertical" : "horizontal"}
      // defaultSelectedKeys={["2"]}
      items={items1}
      style={{
        flex: 1,
        minWidth: 0,
        backgroundColor: "inherit",
        color: "#fff",
      }}
    />
  );
};
