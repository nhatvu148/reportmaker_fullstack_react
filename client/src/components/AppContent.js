import React, { useContext } from "react";
import MyContext from "../context/table/myContext";
import LangContext from "../context/lang/langContext";
import { DatePicker, Row, Breadcrumb, Layout, Button } from "antd";
import AppTable from "./AppTable";
import { SET_DATE } from "../context/types";

const AppContent = () => {
  const myContext = useContext(MyContext);
  const langContext = useContext(LangContext);

  const {
    inputDailyData: { _reportDate, _selectDate }
  } = langContext.currentLangData
    ? langContext.currentLangData
    : {
        inputDailyData: {
          _reportDate: "Report date:",
          _selectDate: "Select Date"
        }
      };

  const { Content } = Layout;
  const onChange = date => {
    myContext.dispatch({ type: SET_DATE, payload: date });
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
        <Row type="flex" justify="end">
          <Button size="middle" style={{ margin: "0px 5px 0 0" }}>
            {_reportDate}
          </Button>
          <DatePicker
            showToday={false}
            placeholder={_selectDate}
            defaultValue={myContext.selectedDate}
            onChange={onChange}
          />
        </Row>

        <AppTable />
      </Content>
    </Layout>
  );
};

export default AppContent;
