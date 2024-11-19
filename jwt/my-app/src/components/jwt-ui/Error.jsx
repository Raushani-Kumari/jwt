import React from "react";
import { useLocation } from "react-router-dom";

export default function Error({ msg }) {
  const { state } = useLocation();
  return (
    <div>Error: {state?.message ?? (msg || "Something Went Wrong!!")}</div>
  );
}
