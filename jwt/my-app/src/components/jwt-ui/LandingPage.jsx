import React, { useContext, useState } from "react";
import LogIn from "./LogIn";
import { Modal } from "antd";
import { AuthModelContext } from "../../context/AuthModelContext";
import { Outlet } from "react-router-dom";
import Signup from "./Signup";
import ViewCarousel from "../layout/ViewCarousel";
import ViewProducts from "../layout/ViewProducts";

export default function LandingPage() {
  const { showAuthModel, setShowAuthModel } = useContext(AuthModelContext);
  const [showModalContent, setShowModalContent] = useState(true);
  // check user role and redirect to role based page

  const handleCancel = () => {
    setShowAuthModel(false);
  };
  const toggleModalContent = () => {
    setShowModalContent(!showModalContent);
  };
  return (
    <div>
      <Modal
        maskClosable={false}
        onCancel={handleCancel}
        footer={null}
        open={showAuthModel}
      >
        {showModalContent ? (
          <LogIn setShowModalContent={toggleModalContent} isModel={true} />
        ) : (
          <Signup setShowModalContent={toggleModalContent} isModel={true} />
        )}
      </Modal>

      {/* make components for what to display on home page */}
      {/* <ViewCarousel /> */}
      {/* show these above components when user is not logged in */}
      {/* <ViewCarousel />
      <ViewProducts /> */}

      <Outlet />
    </div>
  );
}
