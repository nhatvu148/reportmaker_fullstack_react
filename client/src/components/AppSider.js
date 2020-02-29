import React from "react";
import { Layout, Menu, Icon } from "antd";
import { Link } from "react-router-dom";

const AppSider = props => {
  const { Sider } = Layout;

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
      <Menu mode="inline" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1">
          <Link to="/">
            <Icon type="form" />
            <span>Input Daily Data</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/weeklyreview">
            <Icon type="area-chart" />
            <span>Weekly Review</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/monthlyreview">
            <Icon type="area-chart" />
            <span>Monthly Review</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link to="/dailyhistory">
            <Icon type="calendar" />
            <span>Daily History</span>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default AppSider;
