import React, { useContext } from "react";
import MyContext from "../context/myContext";
import { DatePicker, Row, Col, Breadcrumb, Layout } from "antd";
import AppTable from "./AppTable";
import moment from "moment";
import { SET_DATE } from "../context/types";

const AppContent = () => {
  const myContext = useContext(MyContext);
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
          <Col span={2}>
            <DatePicker
              defaultValue={myContext.selectedDate}
              onChange={onChange}
            />
          </Col>
        </Row>

        <AppTable />
      </Content>
    </Layout>
  );
};

export default AppContent;
