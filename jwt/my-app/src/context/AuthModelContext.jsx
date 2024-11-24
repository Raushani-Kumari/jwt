import React, { createContext, useContext, useEffect, useState } from "react";

export const AuthModelContext = createContext();

export const AuthModelProvider = ({ children }) => {
  const [showAuthModel, setShowAuthModel] = useState(false);

  return (
    <AuthModelContext.Provider value={{ showAuthModel, setShowAuthModel }}>
      {children}
    </AuthModelContext.Provider>
  );
};

