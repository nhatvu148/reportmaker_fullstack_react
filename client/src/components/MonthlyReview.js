import React, { useContext, useEffect } from "react";
import MyContext from "../context/table/myContext";
import ProgressBar from "./layout/ProgressBar";
import { SELECTED_KEYS } from "../context/types";
import { Layout, Breadcrumb } from "antd";

const MonthlyReview = props => {
  // console.log(props.match.path);
  const myContext = useContext(MyContext);
  const { Content } = Layout;

  const { loading, dispatch } = myContext;

  useEffect(() => {
    if (loading) {
      ProgressBar.start();
    }
    if (!loading) {
      ProgressBar.done();
    }
  });

  useEffect(() => {
    dispatch({ type: SELECTED_KEYS, payload: "/monthlyreview" });
    // eslint-disable-next-line
  }, []);

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
        <h1>MonthlyReview</h1>
      </Content>
    </Layout>
  );
};

export default MonthlyReview;
