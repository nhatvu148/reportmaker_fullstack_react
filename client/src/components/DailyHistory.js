import React from "react";
import { Layout, Breadcrumb } from "antd";

const DailyHistory = () => {
  const { Content } = Layout;

  return (
    <Layout style={{ padding: "0 15px 15px" }}>
      <Breadcrumb style={{ margin: "16px 0" }} />
      <Content
        style={{
          padding: "20px 50px",
          borderRadius: "2px",
          position: "relative",
          transition: "all .3s"
        }}
      >
        <h1>DailyHistory</h1>
      </Content>
    </Layout>
  );
};

export default DailyHistory;
