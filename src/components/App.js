import React from "react";
import AppTable from "./AppTable";
import { DatePicker, Row, Col } from "antd";
// import moment from "moment";

const App = () => {
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  return (
    <div style={{ padding: "100px 100px" }}>
      <Row type="flex" justify="end">
        <Col span={2}>
          <DatePicker
            // defaultValue={moment(`${moment()}`)}
            onChange={onChange}
          />
        </Col>
      </Row>

      <AppTable />
    </div>
  );
};

export default App;
