import React, { useState } from "react";
import AppContent from "./AppContent";
import AppSider from "./AppSider";
import WeeklyReview from "./WeeklyReview";
import MonthlyReview from "./MonthlyReview";
import DailyHistory from "./DailyHistory";
import { Row, Col, Layout, Menu, Icon, Dropdown, message } from "antd";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./Style.css";
import "antd/dist/antd.css";

import MyState from "../context/MyState";

const App = () => {
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
    <MyState>
      <Layout>
        <Router basename={process.env.REACT_APP_ROUTER_BASE || ""}>
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
              <Switch>
                <Route path="/" exact component={AppContent} />
                <Route path="/weeklyreview" exact component={WeeklyReview} />
                <Route path="/monthlyreview" exact component={MonthlyReview} />
                <Route path="/dailyhistory" exact component={DailyHistory} />
              </Switch>
              <Footer>
                <h3 style={{ margin: "20px 20px" }}>
                  Copyright © 2002-2020 TechnoStar Co., Ltd.
                </h3>
              </Footer>
            </Layout>
          </Layout>
        </Router>
      </Layout>
    </MyState>
  );
};

export default App;
