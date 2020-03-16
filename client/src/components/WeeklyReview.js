import React, { useState, useContext, useEffect, useRef } from "react";
import MyContext from "../context/table/myContext";
import AuthContext from "../context/auth/authContext";
import ProgressBar from "./layout/ProgressBar";
import { SELECT_PAGE } from "../context/types";
import {
  Button,
  Layout,
  Breadcrumb,
  DatePicker,
  message,
  Select,
  Row,
  Col
} from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import moment from "moment";
import SpreadSheet from "./spreadsheet/SpreadSheet";

const WeeklyReview = props => {
  // console.log(props.match.path);
  const myContext = useContext(MyContext);
  const authContext = useContext(AuthContext);
  const spreadsheet = useRef();

  const { Content } = Layout;

  const { loading, dispatch } = myContext;

  const { user } = authContext;
  const name = user && user.name;

  const [weekSelect, SetWeekSelect] = useState("");
  const [sheetEvent, setSheetEvent] = useState("");
  // const [sheet, setSheet] = useState("");
  const [roleSelect, setRoleSelect] = useState("");

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

  useEffect(() => {
    console.log(
      "spreadsheet: ",
      spreadsheet.current.spreadsheet.events,
      "sheetEvent: ",
      sheetEvent
    );
    spreadsheet.current.spreadsheet.events.on(
      "afterValueChange",
      (cell, value) => {
        setSheetEvent(`Value in cell ${cell} changed to ${value}`);
      }
    );
    spreadsheet.current.spreadsheet.setValue("C3", "UNDER");
    spreadsheet.current.spreadsheet.setValue("C4", "DEVELOPMENT");
  }, [sheetEvent]);

  const onChangeDate = async date => {
    if (date !== null) {
      const sunday = date
        .startOf("week")
        .format("YYYYMMDD")
        .toString();
      if (roleSelect !== "") {
        const res = await axios.get(`api/weekly/get`, {
          params: {
            name,
            sunday,
            role: roleSelect
          }
        });

        console.log(res.data.data);
      }
      SetWeekSelect(sunday);
    }
  };

  const onChangeRole = async role => {
    if (weekSelect !== "") {
      const res = await axios.get(`api/weekly/get`, {
        params: {
          name,
          sunday: weekSelect,
          role
        }
      });

      console.log(res.data.data);
    }
    setRoleSelect(role);
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
        `${weekSelect}_${moment(weekSelect, "YYYYMMDD")
          .add(6, "days")
          .format("YYYYMMDD")
          .toString()}_${name}.xlsx`
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
        <Row>
          <Col lg={{ span: 6, offset: 3 }}>
            <Button size="middle" style={{ margin: "0px 5px 0 0" }}>
              Report Week:
            </Button>
            <DatePicker
              bordered={true}
              picker="week"
              onChange={date => {
                onChangeDate(date);
              }}
            />
          </Col>
          <Col lg={{ span: 4, offset: 1 }}>
            <Button size="middle" style={{ margin: "0px 5px 0 0" }}>
              Role:
            </Button>
            <Select
              showSearch
              style={{ width: 120 }}
              optionFilterProp="children"
              value={roleSelect ? roleSelect : "Select Role"}
              onChange={role => {
                onChangeRole(role);
              }}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Select.Option key="Developer" id="Developer" value="Developer">
                Developer
              </Select.Option>
              <Select.Option key="Engineer" id="Engineer" value="Engineer">
                Engineer
              </Select.Option>
              <Select.Option key="Eng & Dev" id="Eng & Dev" value="Eng & Dev">
                Eng & Dev
              </Select.Option>
            </Select>
          </Col>
          <Col lg={{ span: 4, offset: 2 }}>
            <Button
              size="large"
              onClick={() => {
                if (weekSelect === "") {
                  message.warning("Please select a week!");
                } else if (roleSelect === "") {
                  message.warning("Please select a role!");
                } else {
                  onDownload(name, weekSelect);
                }
              }}
              type="danger"
              style={{ margin: "0px 50px 16px 0" }}
            >
              Download Report
            </Button>
          </Col>
        </Row>
        <Row>
          <Col lg={{ span: 20, offset: 2 }}>
            <SpreadSheet
              ref={spreadsheet}
              rowsCount={200}
              colsCount={20}
              menu={true}
              readonly={false}
            />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default WeeklyReview;
