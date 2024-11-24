import React, { useEffect, useState } from "react";

export default function useAuthModel() {
  const [showAuthModel, setShowAuthModel] = useState(false);

  

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 768);
//     };

//     window.addEventListener("resize", handleResize);
//     handleResize();

//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

  return { showAuthModel , setShowAuthModel};
}
