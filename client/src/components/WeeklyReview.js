import React, { useState, useContext, useEffect } from "react";
import MyContext from "../context/table/myContext";
import ProgressBar from "./layout/ProgressBar";
import { SELECT_PAGE } from "../context/types";
import { Button, Layout, Breadcrumb, DatePicker } from "antd";
import "antd/dist/antd.css";
import axios from "axios";

const WeeklyReview = props => {
  // console.log(props.match.path);
  const myContext = useContext(MyContext);
  const { Content } = Layout;

  const { loading, dispatch } = myContext;

  const { weekSelect, SetWeekSelect } = useState("");

  useEffect(() => {
    if (loading) {
      ProgressBar.start();
    }
    if (!loading) {
      ProgressBar.done();
    }
  });

  useEffect(() => {
    dispatch({ type: SELECT_PAGE, payload: "/weeklyreview" });
    // eslint-disable-next-line
  }, []);

  const onDownload = async () => {
    try {
      const res = await axios(`/xlsx`, {
        method: "GET",
        responseType: "blob"
        //Force to receive data in a Blob Format
      });

      //Create a Blob from the PDF Stream
      const file = new Blob([res.data], {
        type: "application/xlsx"
      });
      //Build a URL from the file
      const fileURL = URL.createObjectURL(file);
      //Open the URL on new Window
      const link = document.createElement("a");
      link.href = fileURL;
      link.setAttribute("download", "file.xlsx");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.log(error);
    }
  };

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
        <DatePicker
          picker="week"
          bordered={false}
          onChange={async date => {
            const sunday = date
              .startOf("week")
              .format("YYYYMMDD")
              .toString();
            await axios.post(`api/weekly/post`, {
              params: {
                sunday
              }
            });
          }}
        />
        <div>
          <Button
            size="large"
            onClick={onDownload}
            type="danger"
            style={{ margin: "0px 50px 16px 0" }}
          >
            Download Report
          </Button>
        </div>
      </Content>
    </Layout>
  );
};

export default WeeklyReview;
