// import Search from "antd/es/input/Search";
import ViewByRole from "../routes/ViewByRole";
import {
  AppstoreOutlined,
  DashboardOutlined,
  ProductOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Input } from "antd";

const { Search } = Input;

export const navConfig = [
  { key: 1, label: "Home", link: "/home", role: [] },
  { key: 2, label: "About", link: "/about", role: [] },
  { key: 3, label: "Contact Us", link: "/contact", role: [] },
  // { key: 4, label: <ViewByRole role={"seller"}>Add Product</ViewByRole>, link: "/seller/addproduct" },
];

export const sideNavConfig = [
  {
    key: 1,
    label: "Dashboard",
    link: "/dashboard",
    icon: <DashboardOutlined style={{ color: "#fff", fontSize: "20px" }} />,
    role: [],
  },
  {
    key: 2,
    label: "Products",
    link: "/products",
    icon: <ProductOutlined style={{ color: "#fff", fontSize: "20px" }} />,
    role: [],
  },
  {
    key: 3,
    label: "Orders",
    link: "/orders",
    icon: <AppstoreOutlined style={{ color: "#fff", fontSize: "20px" }} />,
    role: [],
  },
  // { key: 4, label: <ViewByRole role={"seller"}>Add Product</ViewByRole>, link: "/seller/addproduct" },
];

const unAuthenticatedNavMenuStyle = {
  marginTop: "0px",
  marginBottom: "0px",
    // alignItems: "center",
    // justifyContent: "center",
    width: "400px",
}

export const unAuthenticatedNavMenu = [
  { key: 1, label:  <Search style={unAuthenticatedNavMenuStyle} placeholder="input search text" enterButton />, link: "/home", },
  { key: 2, label: "Login", link: "/login", },
  { key: 3, label: "Cart", link: "/cart", icon: <ShoppingCartOutlined /> },
]