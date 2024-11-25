import { Menu } from "antd";
import { navConfig } from "../../config/navConfig";
import useWidth from "../hooks/useWidth";
import { Link } from "react-router-dom";

export default function NavMenu() {
  const { isMobile } = useWidth();

  const items1 = navConfig.map(({ key, label, link }) => ({
    key,
    label: <Link to={link}>{label}</Link>,
  }));

  return (
    <Menu
      multiple={false}
      mode={isMobile ? "vertical" : "horizontal"}
      items={items1}
      style={{
        flex: 1,
        minWidth: 0,
        backgroundColor: "inherit",
        color:"white"
      }}
    />
  );
};
