import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function ViewByRole({ role, children }) {
  // fetch current user role using user---usercontext
  // check the role
  // check if the user.role matches to props or not
  // if yes--->> return child
  // if no --->> return null
  const { user } = useContext(UserContext);

  if (user && user?.role?.includes(role)) {
    return <>{children}</>;
  } else {
    console.debug(`No User Info found.`);
    return null;
  }
}
