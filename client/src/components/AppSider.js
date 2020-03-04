import React, { useEffect, useContext } from "react";
import { Layout, Menu } from "antd";
import {
  FormOutlined,
  AreaChartOutlined,
  CalendarOutlined
} from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import { SELECT_PAGE } from "../context/types";
import MyContext from "../context/table/myContext";
import LangContext from "../context/lang/langContext";

const AppSider = props => {
  // console.log(typeof props.match.url);
  const myContext = useContext(MyContext);
  const langContext = useContext(LangContext);

  const {
    inputDailyData: { _inputDailyData },
    weeklyReview: { _weeklyReview },
    monthlyReview: { _monthlyReview },
    dailyHistory: { _dailyHistory }
  } = langContext.currentLangData;

  const { selectedKeys, dispatch } = myContext;

  const { Sider } = Layout;

  useEffect(() => {
    dispatch({ type: SELECT_PAGE, payload: "/" });
    // eslint-disable-next-line
  }, []);

  return (
    <Sider
      width={200}
      style={{ background: "#fff" }}
      trigger={null}
      collapsible
      collapsedWidth={0}
      collapsed={props.isCollapsed}
    >
      <div className="logo">
        <h2>
          <a
            href="http://www.e-technostar.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              alt="/"
              width={160}
              src="http://www.e-technostar.com/beta2016/wp-content/uploads/2019/04/technostar_logo_w210.png"
            />
          </a>
        </h2>
      </div>
      <Menu
        mode="inline"
        selectedKeys={selectedKeys}
        onClick={({ key }) => {
          switch (key) {
            case "/":
              dispatch({ type: SELECT_PAGE, payload: "/" });
              props.history.push("/");
              break;

            case "/weeklyreview":
              dispatch({ type: SELECT_PAGE, payload: "/weeklyreview" });
              props.history.push("/weeklyreview");
              break;

            case "/monthlyreview":
              dispatch({ type: SELECT_PAGE, payload: "/monthlyreview" });
              props.history.push("/monthlyreview");
              break;

            case "/dailyhistory":
              dispatch({ type: SELECT_PAGE, payload: "/dailyhistory" });
              props.history.push("/dailyhistory");
              break;

            default:
              break;
          }
        }}
      >
        <Menu.Item key="/">
          <FormOutlined />
          <span>{_inputDailyData}</span>
        </Menu.Item>
        <Menu.Item key="/weeklyreview">
          <AreaChartOutlined />
          <span>{_weeklyReview}</span>
        </Menu.Item>
        <Menu.Item key="/monthlyreview">
          <AreaChartOutlined />
          <span>{_monthlyReview}</span>
        </Menu.Item>
        <Menu.Item key="/dailyhistory">
          <CalendarOutlined />
          <span>{_dailyHistory}</span>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default withRouter(AppSider);
