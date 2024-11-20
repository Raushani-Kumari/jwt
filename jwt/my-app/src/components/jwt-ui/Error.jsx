import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "semantic-ui-react";


export default function Error({ msg }) {
  const { state } = useLocation();
  console.log("state from error: ", state)
  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center", padding: "20px", margin: "20px"}}>
      <Button> <Link to={'/home'}>HOME</Link></Button>
      <div>Error: {state?.message ?? (msg || "Something Went Wrong!!")}</div>
    </div>
  );
}
