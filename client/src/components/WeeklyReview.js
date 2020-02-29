import React, { useContext, useEffect } from "react";
import MyContext from "../context/table/myContext";
import ProgressBar from "./layout/ProgressBar";
import { SELECTED_KEYS } from "../context/types";
import { Layout, Breadcrumb, DatePicker } from "antd";
import "antd/dist/antd.css";

const WeeklyReview = props => {
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
    dispatch({ type: SELECTED_KEYS, payload: "/weeklyreview" });
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
        <h1>Weekly Review</h1>
        <DatePicker picker="week" bordered={false} />
      </Content>
    </Layout>
  );
};

export default WeeklyReview;
