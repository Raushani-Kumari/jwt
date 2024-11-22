import React from 'react'
import Navbar from './Navbar';
import SellerNav from './seller/SellerNav';
import AddProduct from './seller/AddProduct';

const Seller = () => {
    return (
        <>
        <SellerNav />
        {/* <div style={{
            textAlign: "center", margin: "20px", padding: "20px", fontSize: "40px"
        }}>Seller Page</div> */}

        <div  style={{
            textAlign: "center", margin: "20px", padding: "20px", fontSize: "40px"
        }}>Making add product form</div>
        {/* <AddProduct></AddProduct> */}
        </>
    )
}

export default Seller;