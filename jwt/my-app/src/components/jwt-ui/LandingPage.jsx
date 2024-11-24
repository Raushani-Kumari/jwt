import React, { useContext, useState } from "react";
import LogIn from "./LogIn";
import { Modal } from "antd";
import { AuthModelContext } from "../../context/AuthModelContext";
import { Outlet } from "react-router-dom";

export default function LandingPage() {
  const { showAuthModel, setShowAuthModel } = useContext(AuthModelContext);
  // check user role and redirect to role based page

  const handleOk = () => {
    setShowAuthModel(false);
  };
  const handleCancel = () => {
    setShowAuthModel(false);
  };
  return (
    <div>
      <Modal
        maskClosable={false}
        onCancel={handleCancel}
        footer={null}
        open={showAuthModel}
      >
        <LogIn isModel={true} />
      </Modal>
      <Outlet />
    </div>
  );
}
