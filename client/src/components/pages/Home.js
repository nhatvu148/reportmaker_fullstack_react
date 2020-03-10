import React, {
  useState,
  useContext,
  useEffect,
  useLayoutEffect,
  Fragment
} from "react";
import { Row, Layout, Menu, Dropdown, message, Button } from "antd";
import {
  LogoutOutlined,
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UnorderedListOutlined
} from "@ant-design/icons";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { QUOTES } from "../../context/types";

import Login from "../auth/Login";
import PrivateRoute from "../routing/PrivateRoute";
import AppContent from "../AppContent";
import AppSider from "../AppSider";
import WeeklyReview from "../WeeklyReview";
import MonthlyReview from "../MonthlyReview";
import DailyHistory from "../DailyHistory";
import "../Style.css";
import "antd/dist/antd.css";
import AuthContext from "../../context/auth/authContext";
import MyContext from "../../context/table/myContext";
import DailyContext from "../../context/daily/dailyContext";
import LangContext from "../../context/lang/langContext";
import axios from "axios";
import { SET_LANG } from "../../context/types";

const Home = () => {
  const authContext = useContext(AuthContext);
  const myContext = useContext(MyContext);
  const dailyContext = useContext(DailyContext);
  const langContext = useContext(LangContext);

  const { logout, user, loadUser } = authContext;

  const { clearLogout, quotes, dispatch } = myContext;

  const { clearDailyLogout } = dailyContext;

  const { switchLang, lang } = langContext;
  const {
    home: { _editProfile, _logOut }
  } = langContext.currentLangData;

  useLayoutEffect(() => {
    const selectedLang = window.localStorage.getItem("appUILang");

    if (selectedLang) {
      dispatch({ type: SET_LANG, payload: selectedLang });
    }
    // eslint-disable-next-line
  }, [lang]);

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const randomQuote = async () => {
      try {
        const res = await axios.get("https://api.quotable.io/random");
        // console.log(res.data);
        dispatch({ type: QUOTES, payload: res.data.content });
      } catch (error) {
        console.log(error);
      }
    };
    randomQuote();
  }, [dispatch]);

  const onLogout = () => {
    logout();
    clearLogout();
    clearDailyLogout();
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

  const langMenu = (
    <Menu>
      <Menu.Item key="1" onClick={() => switchLang("en-US")}>
        English
      </Menu.Item>
      <Menu.Item key="2" onClick={() => switchLang("ja")}>
        日本語
      </Menu.Item>
      <Menu.Item key="3" onClick={() => switchLang("vi")}>
        Tiếng Việt
      </Menu.Item>
      <Menu.Item key="4" onClick={() => switchLang("zh")}>
        中文
      </Menu.Item>
      <Menu.Item key="5" onClick={() => switchLang("ko")}>
        한국어
      </Menu.Item>
    </Menu>
  );

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={onEdit}>
        <UserOutlined />
        {_editProfile}
      </Menu.Item>
      <Menu.Item key="2" onClick={onLogout} href="#!">
        <LogoutOutlined />
        {_logOut}
      </Menu.Item>
    </Menu>
  );
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Fragment>
          <Layout>
            <AppSider isCollapsed={collapsed} />
            <Layout>
              <Layout>
                <Header>
                  <Row type="flex" justify="space-between">
                    {React.createElement(
                      collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                      {
                        className: "trigger",
                        onClick: toggle
                      }
                    )}
                    <div>
                      <Dropdown overlay={langMenu}>
                        <Button style={{ marginRight: "5px" }}>
                          {lang === "en-US"
                            ? "English"
                            : lang === "ja"
                            ? "日本語"
                            : lang === "vi"
                            ? "Tiếng Việt"
                            : lang === "zh"
                            ? "中文"
                            : lang === "ko"
                            ? "한국어"
                            : null}
                        </Button>
                      </Dropdown>

                      <Dropdown.Button
                        style={{ marginRight: "65px" }}
                        onClick={onNameClick}
                        overlay={menu}
                        icon={<UnorderedListOutlined />}
                      >
                        {user && user.name}
                      </Dropdown.Button>
                    </div>
                  </Row>
                </Header>
              </Layout>
              <PrivateRoute key="/" path="/" exact component={AppContent} />
              <PrivateRoute
                key="/weeklyreview"
                path="/weeklyreview"
                exact
                component={WeeklyReview}
              />
              <PrivateRoute
                key="/monthlyreview"
                path="/monthlyreview"
                exact
                component={MonthlyReview}
              />
              <PrivateRoute
                key="/dailyhistory"
                path="/dailyhistory"
                exact
                component={DailyHistory}
              />
              <Footer>
                <h3 style={{ margin: "20px 20px" }}>
                  {quotes === null ? null : `"${quotes}"`}
                </h3>
                <h3 style={{ margin: "20px 20px" }}>
                  Copyright © 2002-2020 TechnoStar Co., Ltd.
                </h3>
              </Footer>
            </Layout>
          </Layout>
        </Fragment>
      </Switch>
    </Router>
  );
};

export default Home;
