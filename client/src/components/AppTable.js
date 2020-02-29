import React, { useState, Fragment, useEffect, useContext } from "react";
import MyContext from "../context/myContext";
import Spinner from "./layout/Spinner";
import {
  SELECT_PJID,
  SELECT_PJNAME,
  SELECT_SUBID,
  SELECT_SUBNAME,
  START_TIME,
  END_TIME,
  ADD_ROW,
  DELETE_ROW,
  STATUS,
  COMMENT
} from "../context/types";
import {
  Button,
  Select,
  Table,
  TimePicker,
  Popconfirm,
  Icon,
  Input,
  InputNumber
} from "antd";
import moment from "moment";
import { EditableFormRow } from "./EditableCell";

const AppTable = () => {
  const myContext = useContext(MyContext);
  const {
    selectedDate,
    projects,
    subs,
    dataSource,
    loading,
    dispatch,
    getProject,
    getSub,
    getDataFromDate
  } = myContext;

  const [count, setCount] = useState(dataSource.length);

  useEffect(() => {
    getProject();
    getSub();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getDataFromDate(selectedDate, projects, subs);
  }, [selectedDate]);

  const columns = [
    {
      title: "Project ID",
      dataIndex: "selectedProjectId",
      key: "selectedProjectId",

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
              dispatch({ type: SELECT_PJID, rowIndex, value, projects });

              console.log(dataSource[rowIndex]);
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
              dispatch({ type: SELECT_PJNAME, rowIndex, value, projects });

              console.log(dataSource[rowIndex]);
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

              console.log(dataSource[rowIndex]);
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

              console.log(dataSource[rowIndex]);
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
      render: (startTime, record, rowIndex) => (
        <TimePicker
          style={{ width: 110 }}
          defaultOpenValue={moment("00:00", "HH:mm")}
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
      render: (endTime, record, rowIndex) => (
        <TimePicker
          style={{ width: 110 }}
          defaultOpenValue={moment("00:00", "HH:mm")}
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
      render: (text, record, rowIndex) => (
        <Input
          style={{ width: 250 }}
          value={dataSource[rowIndex].comment}
          onChange={event => {
            // console.log(event.target.value);
            dispatch({ type: COMMENT, rowIndex, value: event.target.value });
          }}
        />
      )
    },
    {
      title: "",
      dataIndex: "operation",
      render: (text, record, rowIndex) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => onDelete(record.key)}
          >
            <a href="/">
              <Icon type="delete" />
            </a>
          </Popconfirm>
        ) : null
    }
  ];

  const components = {
    body: {
      row: EditableFormRow
    }
  };

  const onAdd = () => {
    const newData = {
      key: count,
      selectedProjectId: "--Choose--",
      selectedProjectName: "--Choose--",
      selectedSubId: "--Choose--",
      selectedSubName: "--Choose--",
      startTime: null,
      endTime: null,
      workTime: "00:00",
      status: null,
      comment: "-"
    };

    dispatch({ type: ADD_ROW, newData });
    setCount(count + 1);
  };

  const onDelete = key => {
    dispatch({ type: DELETE_ROW, key });
  };

  const onSave = () => {
    const {
      selectedProjectId,
      selectedProjectName,
      selectedSubId,
      selectedSubName
    } = dataSource[1];
    fetch(
      `api/projects/add?name=xyz&workdate=2020-02-12&count=1&pjid=${selectedProjectId}&pjname=${selectedProjectName}&subid=${selectedSubId}&subname=${selectedSubName}`
    )
      .then(response => {
        console.log(response);
      })
      .catch(error => console.error(error));
  };

  if (loading) return <Spinner />;

  return (
    <Fragment>
      <Button onClick={onAdd} type="primary" style={{ marginBottom: 16 }}>
        Add a row
      </Button>
      <Table
        style={{ overflowX: "auto" }}
        components={components}
        columns={columns}
        dataSource={dataSource}
        rowKey={record => record.key}
        size="middle"
        bordered
        pagination={false}
        footer={() => (
          <div style={{ marginLeft: "830px" }}>
            <strong>TOTAL TIME: {"10:00"}</strong>
          </div>
        )}
      />
      <Button onClick={onSave} type="danger" style={{ marginTop: 16 }}>
        Save
      </Button>
    </Fragment>
  );
};

export default AppTable;
