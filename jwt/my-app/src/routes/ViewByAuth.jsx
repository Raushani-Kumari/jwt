import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function ViewByAuth({ viewOnAuth, children }) {
  const { user } = useContext(UserContext);
  const { isAuthenticated } = user;

  return viewOnAuth === isAuthenticated && <>{children}</>;
}
