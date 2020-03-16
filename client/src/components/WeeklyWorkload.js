import React, { useState, useContext, useEffect } from "react";
import MyContext from "../context/table/myContext";
import ProgressBar from "./layout/ProgressBar";
import { SELECT_PAGE } from "../context/types";
import { Button, Layout, Breadcrumb, DatePicker, Row, Col, Select } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import { StackColumn } from "@antv/g2plot";
import moment from "moment";

const WeeklyWorkload = props => {
  // console.log(props.match.path);
  const myContext = useContext(MyContext);

  const { Content } = Layout;

  const { loading, dispatch } = myContext;

  const [weekSelect, SetWeekSelect] = useState(moment().subtract(6, "days"));
  const [dataSource, setDataSource] = useState([]);
  const [bySelect, setBySelect] = useState("By Members");

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
    onChangeDate(weekSelect);
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
        text: `Workload ${bySelect}`
      },
      padding: "auto",
      data:
        bySelect === "By Members"
          ? dataSource
          : dataSource.slice().sort((a, b) => Number(a.pjid) - Number(b.pjid)),
      xField: bySelect === "By Members" ? "name" : "pjid",
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
      stackField: bySelect === "By Members" ? "pjid" : "name",
      connectedArea: {
        visible: true,
        triggerOn: "mouseenter"
      }
    });
    console.log(dataSource);

    columnPlot.render();
  }, [dataSource, bySelect]);

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
    SetWeekSelect(date);
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
          <Col lg={{ span: 6, offset: 4 }}>
            <Button size="middle" style={{ margin: "0px 5px 0 0" }}>
              Week:
            </Button>
            <DatePicker
              bordered={true}
              picker="week"
              value={weekSelect}
              onChange={date => {
                onChangeDate(date);
              }}
            />
          </Col>

          <Col lg={{ span: 6, offset: 2 }}>
            <Button size="middle" style={{ margin: "0px 5px 0 0" }}>
              Workload:
            </Button>
            <Select
              showSearch
              style={{ width: 120 }}
              optionFilterProp="children"
              value={bySelect ? bySelect : "Select Role"}
              onChange={value => {
                setBySelect(value);
              }}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Select.Option
                key="By Members"
                id="By Members"
                value="By Members"
              >
                By Members
              </Select.Option>
              <Select.Option
                key="By Projects"
                id="By Projects"
                value="By Projects"
              >
                By Projects
              </Select.Option>
            </Select>
          </Col>
        </Row>
        <div id="G1" style={{ height: "822px" }} />
      </Content>
    </Layout>
  );
};

export default WeeklyWorkload;
