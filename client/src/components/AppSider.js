import React, { useEffect, useContext } from "react";
import { Layout, Menu } from "antd";
import {
  FormOutlined,
  AreaChartOutlined,
  CalendarOutlined
} from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import { SELECTED_KEYS } from "../context/types";
import MyContext from "../context/table/myContext";

const AppSider = props => {
  // console.log(typeof props.match.url);
  const myContext = useContext(MyContext);

  const {
    onRootClicked,
    onWeekClicked,
    onMonthClicked,
    onDayClicked,
    selectedKeys,
    dispatch
  } = myContext;

  const { Sider } = Layout;

  useEffect(() => {
    dispatch({ type: SELECTED_KEYS, payload: "/" });
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
              dispatch({ type: SELECTED_KEYS, payload: "/" });
              props.history.push("/");
              onRootClicked();
              break;

            case "/weeklyreview":
              dispatch({ type: SELECTED_KEYS, payload: "/weeklyreview" });
              props.history.push("/weeklyreview");
              onWeekClicked();
              break;

            case "/monthlyreview":
              dispatch({ type: SELECTED_KEYS, payload: "/monthlyreview" });
              props.history.push("/monthlyreview");
              onMonthClicked();
              break;

            case "/dailyhistory":
              dispatch({ type: SELECTED_KEYS, payload: "/dailyhistory" });
              props.history.push("/dailyhistory");
              onDayClicked();
              break;

            default:
              break;
          }
        }}
      >
        <Menu.Item key="/">
          <FormOutlined />
          <span>Input Daily Data</span>
        </Menu.Item>
        <Menu.Item key="/weeklyreview">
          <AreaChartOutlined />
          <span>Weekly Review</span>
        </Menu.Item>
        <Menu.Item key="/monthlyreview">
          <AreaChartOutlined />
          <span>Monthly Review</span>
        </Menu.Item>
        <Menu.Item key="/dailyhistory">
          <CalendarOutlined />
          <span>Daily History</span>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default withRouter(AppSider);
