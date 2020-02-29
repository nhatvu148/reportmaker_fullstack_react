import React, { useState, useContext, useEffect } from "react";
import { Row, Col, Layout, Menu, Icon, Dropdown, message } from "antd";
import { Switch, Route } from "react-router-dom";
import AppContent from "../AppContent";
import AppSider from "../AppSider";
import WeeklyReview from "../WeeklyReview";
import MonthlyReview from "../MonthlyReview";
import DailyHistory from "../DailyHistory";
import "../Style.css";
import "antd/dist/antd.css";
import AuthContext from "../../context/auth/authContext";
import MyContext from "../../context/table/myContext";

const Home = () => {
  const authContext = useContext(AuthContext);
  const myContext = useContext(MyContext);

  const { logout, user, loadUser } = authContext;

  const { clearLogout } = myContext;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  const onLogout = () => {
    logout();
    clearLogout();
    message.info("LOGGED OUT");
  };

  const [collapsed, setCollapsed] = useState(true);

  const { Header, Footer } = Layout;

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const onEdit = e => {
    message.info("Editing");
    // console.log("click", e);
  };

  const onNameClick = () => {
    const myTime = new Date().getHours();
    let greeting;
    if (myTime >= 0 && myTime <= 12) {
      greeting = "Good Morning";
    } else if (myTime > 12 && myTime <= 18) {
      greeting = "Good Afternoon";
    } else {
      greeting = "Good Evening";
    }
    message.info(greeting + ", " + (user && user.name) + "-san!");
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={onEdit}>
        <Icon type="user" />
        Edit Profile
      </Menu.Item>
      <Menu.Item key="2" onClick={onLogout} href="#!">
        <Icon type="logout" />
        Log out
      </Menu.Item>
    </Menu>
  );
  return (
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
                  onClick={onNameClick}
                  overlay={menu}
                  icon={<Icon type="unordered-list" />}
                >
                  {user && user.name}
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
  );
};

export default Home;
