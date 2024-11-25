import { Carousel, Flex } from "antd";
import React from "react";


export default function ViewCarousel() {
  const contentStyle = {
    margin: 0,
    height: "600px",
    color: "white",
    // lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
    width: "100%"
    // background: "beige",
  };

  return (
    <>
      <div style={{margin:"20px", padding: "10px"
      }}>
        <div style={{margin: "20px", textAlign: "center", fontSize: "40px", fontFamily:"sans-serif"}}>Explore</div>
        <Carousel autoplay={true} 
        autoplaySpeed={3000}
        arrows={true} infinite={false}>
          <div>
           <img style={contentStyle} src="https://img.freepik.com/free-psd/e-commerce-concept-facebook-template_23-2149901072.jpg?t=st=1732523633~exp=1732527233~hmac=7a45049994861d7ecc456473d12a9c16955f6abb98823d263c747f1744afb584&w=1480" />
            {/* <h3 style={contentStyle}>1</h3> */}
          </div>
          <div>
            {/* <h3 style={contentStyle}>2</h3> */}
            <img style={contentStyle} src="https://images.all-free-download.com/images/graphiclarge/ecommerce_website_banner_template_shoppers_sketch_6920121.jpg" />
          </div>
          <div>
            <img src="https://i.pinimg.com/736x/b6/89/96/b68996b0aeb13339740f961ada455a77.jpg" style={contentStyle} /> 
          </div>
          <div>
            <img src="https://golocad.com/wp-content/uploads/2023/05/website-easy-ux.jpg" style={contentStyle} />
          </div>
        </Carousel>
      </div>
    </>
  );
}
