import React, { useState, useContext, useEffect } from "react";
import MyContext from "../context/table/myContext";
import DailyContext from "../context/daily/dailyContext";
import AuthContext from "../context/auth/authContext";
import ProgressBar from "./layout/ProgressBar";
import { SELECTED_KEYS, SORT } from "../context/types";
import { Layout, Breadcrumb, Table, Input, Button } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

const DailyHistory = props => {
  // console.log(props.match.path);
  const myContext = useContext(MyContext);
  const dailyContext = useContext(DailyContext);
  const authContext = useContext(AuthContext);

  const { user } = authContext;
  const name = user && user.name;

  const { Content } = Layout;

  const { dispatch: myDispatch } = myContext;

  const {
    dispatch: dailyDispatch,
    sort,
    loading,
    getDailyData,
    dailySource
  } = dailyContext;

  useEffect(() => {
    if (loading) {
      ProgressBar.start();
    }
    if (!loading) {
      ProgressBar.done();
    }
  });

  useEffect(() => {
    myDispatch({ type: SELECTED_KEYS, payload: "/dailyhistory" });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getDailyData(name, sort);
    // eslint-disable-next-line
  }, [name, sort]);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  let searchInput;

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.select());
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      )
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText("");
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "Date",
      key: "Date",
      align: "center",
      ...getColumnSearchProps("Date")
    },
    {
      title: "Project ID",
      dataIndex: "Project ID",
      key: "Project ID",
      align: "center",
      ...getColumnSearchProps("Project ID")
    },
    {
      title: "Project Name",
      dataIndex: "Project Name",
      key: "Project Name",
      align: "center",
      ...getColumnSearchProps("Project Name")
    },
    {
      title: "Deadline",
      dataIndex: "Deadline",
      key: "Deadline",
      align: "center",
      ...getColumnSearchProps("Deadline")
    },
    {
      title: "Expected Date",
      dataIndex: "Expected Date",
      key: "Expected Date",
      ...getColumnSearchProps("Expected Date")
    },
    {
      title: "SubId",
      dataIndex: "SubId",
      key: "SubId",
      align: "center",
      ...getColumnSearchProps("SubId")
    },
    {
      title: "SubName",
      dataIndex: "SubName",
      key: "SubName",
      align: "center",
      ...getColumnSearchProps("SubName")
    },
    {
      title: "Comment",
      dataIndex: "Comment",
      key: "Comment",
      align: "center",
      ...getColumnSearchProps("Comment")
    },
    {
      title: "Work Time",
      dataIndex: "Work Time",
      key: "Work Time",
      align: "center",
      ...getColumnSearchProps("Work Time")
    },
    {
      title: "Start Hour",
      dataIndex: "Start Hour",
      key: "Start Hour",
      align: "center",
      ...getColumnSearchProps("Start Hour")
    },
    {
      title: "Start Min",
      dataIndex: "Start Min",
      key: "Start Min",
      align: "center",
      ...getColumnSearchProps("Start Min")
    },
    {
      title: "End Hour",
      dataIndex: "End Hour",
      key: "End Hour",
      align: "center",
      ...getColumnSearchProps("End Hour")
    },
    {
      title: "End Min",
      dataIndex: "End Min",
      key: "End Min",
      align: "center",
      ...getColumnSearchProps("End Min")
    }
  ];

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
        <Button
          type="primary"
          style={{ margin: "0px 10px 16px 0" }}
          onClick={() => {
            dailyDispatch({ type: SORT });
          }}
        >
          Sort Date
        </Button>
        <Table
          columns={columns}
          dataSource={dailySource}
          bordered
          className="table-striped-rows"
          style={{ overflowX: "auto" }}
          loading={loading ? true : false}
        />
      </Content>
    </Layout>
  );
};

export default DailyHistory;
