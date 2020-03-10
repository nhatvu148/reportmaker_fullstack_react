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
  } = langContext.currentLangData
    ? langContext.currentLangData
    : {
        inputDailyData: {
          _inputDailyData: "Input Daily Data",
          _reportDate: "Report date:",
          _addARow: "Add a row",
          _sameAsDate: "Same as date:",
          _projectId: "Project ID",
          _projectName: "Project Name",
          _subId: "Sub ID",
          _subName: "Sub Name",
          _startTime: "Start Time",
          _endTime: "End Time",
          _workTime: "Work Time",
          _status: "Status",
          _comment: "Comment",
          _totalWorkTime: "Total Work Time",
          _hours: "hours"
        },
        weeklyReview: {
          _weeklyReview: "Weekly Review"
        },
        monthlyReview: {
          _monthlyReview: "Monthly Review"
        },
        dailyHistory: {
          _dailyHistory: "Daily History",
          _sortDate: "Sort by date",
          _date: "Date",
          _projectId: "Project ID",
          _projectName: "Project Name",
          _deadline: "Deadline",
          _expectedDate: "Expected Date",
          _subId: "Sub ID",
          _subName: "Sub Name",
          _comment: "Comment",
          _workTime: "Work Time",
          _startHour: "Start Hour",
          _startMin: "Start Min",
          _endHour: "End Hour",
          _endMin: "End Min"
        }
      };

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
