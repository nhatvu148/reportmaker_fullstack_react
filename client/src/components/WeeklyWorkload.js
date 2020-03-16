import React, { useState, useContext, useEffect } from "react";
import MyContext from "../context/table/myContext";
import AuthContext from "../context/auth/authContext";
import ProgressBar from "./layout/ProgressBar";
import { SELECT_PAGE } from "../context/types";
import { Button, Layout, Breadcrumb, DatePicker, Row, Col } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import { StackColumn } from "@antv/g2plot";

const WeeklyWorkload = props => {
  // console.log(props.match.path);
  const myContext = useContext(MyContext);
  const authContext = useContext(AuthContext);

  const { Content } = Layout;

  const { loading, dispatch } = myContext;

  const { user } = authContext;
  const name = user && user.name;

  const [weekSelect, SetWeekSelect] = useState("");
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    if (loading) {
      ProgressBar.start();
    }
    if (!loading) {
      ProgressBar.done();
    }
  });

  useEffect(() => {
    dispatch({ type: SELECT_PAGE, payload: "/weeklyworkload" });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let element = document.getElementById("G1");
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }

    const columnPlot = new StackColumn(document.getElementById("G1"), {
      forceFit: true,
      title: {
        visible: true,
        text: "Workload by Members"
      },
      padding: "auto",
      data: dataSource,
      xField: "name",
      yField: "worktime",
      xAxis: {
        title: false,
        autoRotateLabel: true
      },
      yAxis: {
        title: false,
        min: 0
      },
      label: {
        visible: false
      },
      stackField: "pjid",
      connectedArea: {
        visible: true,
        triggerOn: "mouseenter"
      }
    });

    columnPlot.render();
  }, [dataSource]);

  const onChangeDate = async date => {
    const sunday = date
      .startOf("week")
      .format("YYYYMMDD")
      .toString();

    const res = await axios.get(`api/workload/get`, {
      params: {
        sunday
      }
    });

    console.log(res.data.data);

    setDataSource(res.data.data);
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
        <Row>
          <Col lg={{ span: 20, offset: 8 }}>
            <Button size="middle" style={{ margin: "0px 5px 0 0" }}>
              Workload for Week:
            </Button>
            <DatePicker
              bordered={true}
              picker="week"
              onChange={date => {
                onChangeDate(date);
              }}
            />
          </Col>
        </Row>
        <div id="G1" style={{ height: "822px" }} />
      </Content>
    </Layout>
  );
};

export default WeeklyWorkload;
