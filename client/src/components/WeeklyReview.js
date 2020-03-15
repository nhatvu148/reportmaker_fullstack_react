import React, { useState, useContext, useEffect, useRef } from "react";
import MyContext from "../context/table/myContext";
import AuthContext from "../context/auth/authContext";
import ProgressBar from "./layout/ProgressBar";
import { SELECT_PAGE } from "../context/types";
import { Button, Layout, Breadcrumb, DatePicker, message } from "antd";
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
  const [sheet, setSheet] = useState("");

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

  var styledData = {
    data: [
      { cell: "a1", value: "Hello" },
      { cell: "b1", value: "World" },
      { cell: "c1", value: "Nhat" },
      { cell: "d1", value: "Vu" },
      { cell: "e1", value: "Total Price" },

      { cell: "a2", value: "Ecuador" },
      { cell: "b2", value: "Banana" },
      { cell: "c2", value: 6.68, css: "someclass" },
      { cell: "d2", value: 430, css: "someclass" },
      { cell: "e2", value: 2872.4 }
    ],
    styles: {
      someclass: {
        background: "#F2F2F2",
        color: "#F57C00"
      }
    }
  };

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
    // spreadsheet.current.spreadsheet.setValue("A1", 10);
  }, [sheetEvent]);

  const parseData = () => {
    // spreadsheet.current.spreadsheet.parse([
    //   { cell: "A1", value: 1000 },
    //   { cell: "B1", value: 5300 },
    //   { cell: "C1", value: 2900 },
    //   { cell: "A2", value: 1000 },
    //   { cell: "B2", value: 5300 },
    //   { cell: "C2", value: 2900 }
    // ]);
    // spreadsheet.current.spreadsheet.load("dataset.json");
    // spreadsheet.current.spreadsheet.load("", "xlsx");
    // spreadsheet.current.spreadsheet.export.xlsx(); // export
    spreadsheet.current.spreadsheet.parse(styledData);
  };

  const clearAll = () => {
    spreadsheet.current.spreadsheet.parse([]);
    setSheetEvent("");
  };

  const save = () => {
    console.log(spreadsheet.current.spreadsheet.serialize());
    setSheet(spreadsheet.current.spreadsheet.serialize());
  };

  const reload = () => {
    spreadsheet.current.spreadsheet.parse(sheet);
    console.log(sheet);
  };

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
          display: "flex",
          padding: "20px 50px",
          borderRadius: "2px",
          position: "relative",
          transition: "all .3s",
          justifyContent: "center"
        }}
      >
        <div>
          <h1>Weekly Review</h1>
          <DatePicker
            picker="week"
            bordered={true}
            onChange={date => {
              onChangeDate(date);
            }}
          />
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

        <SpreadSheet
          ref={spreadsheet}
          rowsCount={100}
          colsCount={20}
          menu={true}
          readonly={false}
        />
        <button onClick={parseData}>Parse data</button>
        <button onClick={clearAll}>Clear all</button>
        <button onClick={save}>Save</button>
        <button onClick={reload}>Reload</button>
      </Content>
    </Layout>
  );
};

export default WeeklyReview;
