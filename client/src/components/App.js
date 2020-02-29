import React, { useState, useEffect } from "react";
import AppContent from "./AppContent";
import AppSider from "./AppSider";
import WeeklyReview from "./WeeklyReview";
import MonthlyReview from "./MonthlyReview";
import DailyHistory from "./DailyHistory";
import { Row, Col, Layout, Menu, Icon, Dropdown, message } from "antd";
import { BrowserRouter, Route } from "react-router-dom";
import "./Style.css";
import "antd/dist/antd.css";
import moment from "moment";

export const Data1Context = React.createContext();
export const Data2Context = React.createContext();
export const Data3Context = React.createContext();

const App = () => {
  // eslint-disable-next-line
  const [selectedDate, setSelectedDate] = useState(moment().format("YYYYMMDD"));
  const [projects, setProjects] = useState([
    { pjid: "--Choose--", pjname_en: "--Choose--" }
  ]);

  const [subs, setSubs] = useState([
    { subid: "--Choose--", subname_en: "--Choose--" }
  ]);

  const [personalData, setPersonalData] = useState([]);

  useEffect(() => {
    getProject();
    getSub();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log(selectedDate);
    getPersonal(selectedDate);
  }, [selectedDate]);

  const onChangeDate = date => {
    setSelectedDate(date.format("YYYYMMDD"));
  };

  const getPersonal = workdate => {
    const name = "Yoo";
    fetch(`api/personal?name=${name}&workdate=${workdate}`)
      .then(response => response.json())
      .then(response => console.log(response.data))
      // .then(response => setPersonalData(response.data))
      .catch(error => console.error(error));
  };

  const getProject = () => {
    fetch("api/projects")
      .then(response => response.json())
      .then(response => setProjects(response.data))
      .catch(error => console.error(error));
  };

  const getSub = () => {
    fetch("api/subs")
      .then(response => response.json())
      .then(response => setSubs(response.data))
      .catch(error => console.error(error));
  };

  const [collapsed, setCollapsed] = useState(false);

  const { Header, Footer } = Layout;

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuClick = e => {
    message.info("Click on menu item.");
    console.log("click", e);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">
        <Icon type="user" />
        Edit Profile
      </Menu.Item>
      <Menu.Item key="2">
        <Icon type="logout" />
        Sign out
      </Menu.Item>
    </Menu>
  );
  return (
    <Data1Context.Provider value={projects}>
      <Data2Context.Provider value={subs}>
        <Data3Context.Provider value={personalData}>
          <BrowserRouter basename={process.env.REACT_APP_ROUTER_BASE || ""}>
            <Layout>
              <AppSider isCollapsed={collapsed} />
              <Layout>
                <Layout>
                  <Header>
                    <Row type="flex" justify="space-between">
                      <Col span={3}>
                        <Icon
                          className="trigger"
                          type={collapsed ? "menu-unfold" : "menu-fold"}
                          onClick={toggle}
                        />
                      </Col>
                      <Col span={3} offset={18}>
                        <Dropdown.Button
                          overlay={menu}
                          icon={<Icon type="user" />}
                        >
                          User's Name
                        </Dropdown.Button>
                      </Col>
                    </Row>
                  </Header>
                </Layout>
                <Route
                  path="/"
                  exact
                  render={props => (
                    <AppContent {...props} setSelectedDate={onChangeDate} />
                  )}
                />
                <Route path="/weeklyreview" exact component={WeeklyReview} />
                <Route path="/monthlyreview" exact component={MonthlyReview} />
                <Route path="/dailyhistory" exact component={DailyHistory} />
                <ul>
                  {subs.map(sub => (
                    <li key={sub.subid}>
                      {sub.subid} and {sub.subname_en}
                    </li>
                  ))}
                </ul>
                <Footer>
                  <h3 style={{ margin: "20px 20px" }}>
                    Copyright © 2002-2020 TechnoStar Co., Ltd.
                  </h3>
                </Footer>
              </Layout>
            </Layout>
          </BrowserRouter>
        </Data3Context.Provider>
      </Data2Context.Provider>
    </Data1Context.Provider>
  );
};

export default App;
