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
  DELETE_ROW
} from "../context/types";
import {
  Button,
  Select,
  Table,
  TimePicker,
  Popconfirm,
  Icon,
  Input
} from "antd";
import moment from "moment";
import { EditableCell, EditableFormRow } from "./EditableCell";

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
            // onSelect={value => console.log(value, rowIndex)}
            style={{ width: 110 }}
            value={dataSource[rowIndex].selectedProjectId} //if index=rowID that has changed state && create state at dataSource as a value of some dataIndex or sth
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
      editable: true
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
      editable: true
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
      row: EditableFormRow,
      cell: EditableCell
    }
  };
  const newColumns = columns.map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record, rowIndex) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex + rowIndex,
        title: col.title,
        key: col.key
      })
    };
  });

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
      comment: null
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
        columns={newColumns}
        dataSource={dataSource}
        rowKey={record => record.key}
        size="middle"
        bordered
        pagination={false}
      />
      <Button onClick={onSave} type="primary" style={{ marginBottom: 16 }}>
        Save
      </Button>
    </Fragment>
  );
};

export default AppTable;
