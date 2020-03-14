import React, { useState, useContext, useEffect } from "react";
import MyContext from "../context/table/myContext";
import AuthContext from "../context/auth/authContext";
import ProgressBar from "./layout/ProgressBar";
import { SELECT_PAGE } from "../context/types";
import { Button, Layout, Breadcrumb, DatePicker, message } from "antd";
import "antd/dist/antd.css";
import axios from "axios";

const WeeklyReview = props => {
  // console.log(props.match.path);
  const myContext = useContext(MyContext);
  const authContext = useContext(AuthContext);
  const { Content } = Layout;

  const { loading, dispatch } = myContext;

  const { user } = authContext;
  const name = user && user.name;

  const [weekSelect, SetWeekSelect] = useState("");

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

  const onChangeDate = async date => {
    const sunday = date
      .startOf("week")
      .format("YYYYMMDD")
      .toString();
    const res = await axios.get(`api/weekly/get`, {
      params: {
        name,
        sunday
      }
    });
    SetWeekSelect(sunday);
    console.log(res.data.data);
  };

  const onDownload = async (name, weekSelect) => {
    try {
      const res = await axios.get(`api/xlsx/weekly`, {
        responseType: "blob",
        //Force to receive data in a Blob Format
        params: {
          name,
          sunday: weekSelect
        }
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

      link.setAttribute(
        "download",
        `${weekSelect}_${(
          Number.parseInt(weekSelect) + 6
        ).toString()}_${name}.xlsx`
      );

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
          onChange={date => {
            onChangeDate(date);
          }}
        />
        <div>
          <Button
            size="large"
            onClick={() => {
              if (weekSelect === "") {
                message.warning("Please select a week!");
              } else {
                onDownload(name, weekSelect);
              }
            }}
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
