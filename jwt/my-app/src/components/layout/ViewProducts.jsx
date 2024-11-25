import React from "react";
import { Card, Flex, Typography } from "antd";

const { Meta } = Card;
const { Title } = Typography;
export default function ViewProducts() {
  return (
    <>
      <div
        style={{
            display:"flex",
          alignItems:"center",
          justifyContent: "center"
        }}
      >
        <Title level={2}>Latest Collection</Title>
      </div>
    <Flex gap={10} style={{ margin: "20px", padding: "10px" }}>
      <Card
        hoverable
        style={{ width: 240, margin:"10px" }}
        cover={
          <img
            alt="example"
            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
          />
        }
      >
        <Meta title="Europe Street beat" description="www.instagram.com" />
      </Card>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={
          <img
            alt="example"
            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
          />
        }
      >
        <Meta title="Europe Street beat" description="www.instagram.com" />
      </Card>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={
          <img
            alt="example"
            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
          />
        }
      >
        <Meta title="Europe Street beat" description="www.instagram.com" />
      </Card>
    </Flex>
    </>
  );
}
