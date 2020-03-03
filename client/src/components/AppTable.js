import React, { Fragment, useEffect, useContext } from "react";
import MyContext from "../context/table/myContext";
import AuthContext from "../context/auth/authContext";
// import Spinner from "./layout/Spinner";
import {
  SELECT_PJID,
  SELECT_PJNAME,
  SELECT_SUBID,
  SELECT_SUBNAME,
  RESET_PROJECTS,
  START_TIME,
  END_TIME,
  ADD_ROW,
  DELETE_ROW,
  STATUS,
  COMMENT,
  SET_SAME_AS_DATE
} from "../context/types";
import {
  Button,
  Select,
  Table,
  TimePicker,
  DatePicker,
  Popconfirm,
  Input,
  InputNumber,
  AutoComplete
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import moment from "moment";
import { EditableRow } from "./EditableCell";
import ProgressBar from "./layout/ProgressBar";

const AppTable = () => {
  const myContext = useContext(MyContext);
  const authContext = useContext(AuthContext);

  const { user } = authContext;
  const name = user && user.name;

  const {
    selectedDate,
    sameAsDate,
    projects,
    subs,
    dataSource,
    oldCount,
    rowCount,
    loading,
    dispatch,
    getProject,
    getDataFromDate,
    getDataFromSameAsDate,
    onSave
  } = myContext;

  useEffect(() => {
    if (loading) {
      ProgressBar.start();
    }
    if (!loading) {
      ProgressBar.done();
    }
  });

  useEffect(() => {
    getProject();

    // ComponentWillUnmount
    return () => {
      dispatch({ type: RESET_PROJECTS });
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getDataFromDate(name, selectedDate);
    // eslint-disable-next-line
  }, [name, selectedDate]);

  useEffect(() => {
    getDataFromSameAsDate(name, sameAsDate);
    // eslint-disable-next-line
  }, [name, sameAsDate]);

  const columns = [
    {
      title: "Project ID",
      dataIndex: "selectedProjectId",
      key: "selectedProjectId",
      align: "center",

      render: (selectedProjectId, record, rowIndex) => {
        const mySelect = projects.map((obj, index) => {
          return (
            <Select.Option key={index} id={index} value={obj.pjid}>
              {obj.pjid}
            </Select.Option>
          );
        });
        // console.log(dataSource[rowIndex]);
        return (
          <Select
            style={{ width: 110 }}
            value={dataSource[rowIndex].selectedProjectId}
            onChange={value => {
              dispatch({
                type: SELECT_PJID,
                rowIndex,
                value,
                projects
              });

              // console.log(dataSource[rowIndex]);
            }}
          >
            {mySelect}
          </Select>
        );
      }
    },
    {
      title: "Project Name",
      dataIndex: "selectedProjectName",
      key: "selectedProjectName",
      align: "center",

      render: (selectedProjectName, record, rowIndex) => {
        const mySelect = projects.map((obj, index) => {
          return (
            <Select.Option key={index} id={index} value={obj.pjname_en}>
              {obj.pjname_en}
            </Select.Option>
          );
        });
        return (
          <Select
            style={{ width: 200 }}
            value={dataSource[rowIndex].selectedProjectName}
            onChange={value => {
              dispatch({
                type: SELECT_PJNAME,
                rowIndex,
                value,
                projects
              });

              // console.log(dataSource[rowIndex]);
            }}
          >
            {mySelect}
          </Select>
        );
      }
    },
    {
      title: "Sub ID",
      dataIndex: "selectedSubId",
      key: "selectedSubId",
      align: "center",

      render: (selectedSubId, record, rowIndex) => {
        const mySelect = subs.map((obj, index) => {
          return (
            <Select.Option key={index} id={index} value={obj.subid}>
              {obj.subid}
            </Select.Option>
          );
        });
        return (
          <Select
            style={{ width: 110 }}
            value={dataSource[rowIndex].selectedSubId}
            onChange={value => {
              dispatch({ type: SELECT_SUBID, rowIndex, value, subs });

              // console.log(dataSource[rowIndex]);
            }}
          >
            {mySelect}
          </Select>
        );
      }
    },
    {
      title: "Sub Name",
      dataIndex: "selectedSubName",
      key: "selectedSubName",
      align: "center",

      render: (selectedSubName, record, rowIndex) => {
        const mySelect = subs.map((obj, index) => {
          return (
            <Select.Option key={index} id={index} value={obj.subname_en}>
              {obj.subname_en}
            </Select.Option>
          );
        });
        return (
          <Select
            style={{ width: 190 }}
            value={dataSource[rowIndex].selectedSubName}
            onChange={value => {
              dispatch({ type: SELECT_SUBNAME, rowIndex, value, subs });

              // console.log(dataSource[rowIndex]);
            }}
          >
            {mySelect}
          </Select>
        );
      }
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startTime",
      align: "center",
      render: (startTime, record, rowIndex) => (
        <TimePicker
          style={{ width: 110 }}
          defaultValue={moment("00:00", "HH:mm")}
          format={"HH:mm"}
          value={dataSource[rowIndex].startTime}
          onChange={value => {
            dispatch({ type: START_TIME, rowIndex, value });
          }}
        />
      )
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
      align: "center",
      render: (endTime, record, rowIndex) => (
        <TimePicker
          style={{ width: 110 }}
          defaultValue={moment("00:00", "HH:mm")}
          format={"HH:mm"}
          value={dataSource[rowIndex].endTime}
          onChange={value => {
            dispatch({ type: END_TIME, rowIndex, value });
          }}
        />
      )
    },
    {
      title: "Work Time",
      dataIndex: "workTime",
      key: "workTime",
      align: "center",
      render: (text, record, rowIndex) => (
        <Input
          style={{ width: 60 }}
          disabled
          value={dataSource[rowIndex].workTime}
        />
      )
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (text, record, rowIndex) => (
        <InputNumber
          style={{ width: 60 }}
          // value={dataSource[rowIndex].status}
          min={0}
          max={100}
          defaultValue={0}
          onChange={value => {
            // console.log(value);
            dispatch({ type: STATUS, rowIndex, value });
          }}
        />
      )
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
      align: "center",
      render: (text, record, rowIndex) => (
        <AutoComplete
          style={{ width: 200 }}
          options={dataSource[rowIndex].option}
          filterOption={(inputValue, option) =>
            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
          value={dataSource[rowIndex].comment}
          onChange={value => {
            dispatch({ type: COMMENT, rowIndex, value: value });
          }}
        />
      )
    },
    {
      title: "",
      dataIndex: "operation",
      align: "center",
      render: (text, record, rowIndex) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => onDelete(record.key)}
          >
            <a href="/">
              <DeleteOutlined />
            </a>
          </Popconfirm>
        ) : null
    }
  ];

  const components = {
    body: {
      row: EditableRow
    }
  };

  const onAdd = () => {
    const newData = {
      key: rowCount,
      selectedProjectId: "--Choose--",
      selectedProjectName: "--Choose--",
      selectedSubId: "--Choose--",
      selectedSubName: "--Choose--",
      startTime: null,
      endTime: null,
      workTime: "00:00",
      status: null,
      comment: "-",
      option: []
    };

    dispatch({ type: ADD_ROW, newData });
  };

  const onDelete = key => {
    dispatch({ type: DELETE_ROW, key });
  };

  // if (loading) return <Spinner />;
  const totalWorkTime =
    dataSource.length === 0
      ? 0
      : dataSource.reduce(
          (sum, item, idx) => {
            if (idx !== dataSource.length - 1) {
              sum[0] += parseInt(item.workTime.slice(0, 2));
              sum[1] += parseInt(item.workTime.slice(3, 5));
              return sum;
            } else {
              sum[0] += parseInt(item.workTime.slice(0, 2));
              sum[1] += parseInt(item.workTime.slice(3, 5));
              return sum[0] + sum[1] / 60;
            }
          },
          [0, 0]
        );

  const onClickSave = () => {
    onSave(oldCount, dataSource, name, selectedDate);
  };

  return (
    <Fragment>
      <Button
        size="large"
        onClick={onAdd}
        type="danger"
        style={{ margin: "0px 10px 16px 0" }}
      >
        Add a row
      </Button>
      <Button size="middle" style={{ margin: "0px 5px 16px 0" }}>
        Same as date:
      </Button>
      <DatePicker
        value={sameAsDate}
        onChange={date => dispatch({ type: SET_SAME_AS_DATE, payload: date })}
      />
      <Table
        className="table-striped-rows"
        style={{ overflowX: "auto" }}
        components={components}
        columns={columns}
        dataSource={dataSource}
        rowKey={record => record.key}
        size="middle"
        bordered
        pagination={false}
        loading={loading ? true : false}
      />
      <div style={{ textAlign: "center" }}>
        <Button size="large" type="dashed" style={{ margin: "2px 2px 0 0" }}>
          Total Work Time
        </Button>
        <Button size="large" type="dashed" style={{ margin: "2px 2px 0 0" }}>
          =
        </Button>
        <Button size="large" type="primary" style={{ marginTop: "2px" }}>
          {totalWorkTime > 0 ? totalWorkTime.toPrecision(3) : 0}{" "}
          {totalWorkTime > 0 ? "hours" : "hour"}
        </Button>
      </div>
      <div style={{ textAlign: "center" }}>
        <Button
          size="large"
          onClick={onClickSave}
          type="danger"
          style={{ margin: "16px 10px 0 0" }}
        >
          Save Data
        </Button>
        <Button
          size="large"
          type="danger"
          style={{ marginTop: "16px" }}
          onClick={() => {
            sameAsDate === null && selectedDate !== null
              ? getDataFromDate(name, selectedDate)
              : getDataFromSameAsDate(name, sameAsDate);
          }}
        >
          Cancel
        </Button>
      </div>
    </Fragment>
  );
};

export default AppTable;
