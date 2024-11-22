import ViewByRole from "../routes/ViewByRole";

export const navConfig = [
  { key: 1, label: "Home", link: "/home" },
  { key: 2, label: "About", link: "/about" },
  { key: 3, label: "Contact Us", link: "/contact" },
  { key: 4, label: <ViewByRole role={"seller"}>Add Product</ViewByRole>, link: "/seller/addproduct" },
];
