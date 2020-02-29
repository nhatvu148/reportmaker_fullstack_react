import React, { useState } from "react";
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
import "antd/dist/antd.css";
import projects, { projectKeys, projectValues } from "./ProjectObj";
import subObjects, { subKeys, subValues } from "./SubObj";
import { EditableCell, EditableFormRow } from "./EditableCell";
import Data from "./Data";

const AppTable = () => {
  //Set States
  const [dataSource, setDataSource] = useState([...Data]);

  const [count, setCount] = useState(dataSource.length);

  // Columns
  const columns = [
    {
      title: "Project ID",
      dataIndex: "projectId",
      key: "projectId",

      //type selection, option:
      render: (projectId, record, rowIndex) => {
        const mySelect = projectId.split("*").map((value, index) => {
          return (
            <Select.Option key={index} id={index} value={value}>
              {value}
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
              const newDataSource = [...dataSource];
              setDataSource(
                newDataSource.map((obj, idx) => {
                  if (idx === rowIndex) {
                    obj.selectedProjectId = value;
                    obj.selectedProjectName = projects[value];
                  }
                  return obj;
                })
              );

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
      dataIndex: "projectName",
      key: "projectName",

      render: (projectName, record, rowIndex) => {
        const mySelect = projectName.split("*").map((value, index) => {
          return (
            <Select.Option key={index} id={index} value={value}>
              {value}
            </Select.Option>
          );
        });
        return (
          <Select
            style={{ width: 200 }}
            value={dataSource[rowIndex].selectedProjectName}
            onChange={value => {
              const newDataSource = [...dataSource];
              setDataSource(
                newDataSource.map((obj, idx) => {
                  if (idx === rowIndex) {
                    obj.selectedProjectName = value;
                    obj.selectedProjectId = Object.keys(projects).find(
                      key => projects[key] === value
                    );
                  }
                  return obj;
                })
              );

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
      dataIndex: "subId",
      key: "subId",

      render: (subId, record, rowIndex) => {
        const mySelect = subId.split("*").map((value, index) => {
          return (
            <Select.Option key={index} id={index} value={value}>
              {value}
            </Select.Option>
          );
        });
        return (
          <Select
            style={{ width: 110 }}
            value={dataSource[rowIndex].selectedSubId}
            onChange={value => {
              const newDataSource = [...dataSource];
              setDataSource(
                newDataSource.map((obj, idx) => {
                  if (idx === rowIndex) {
                    obj.selectedSubId = value;
                    obj.selectedSubName = subObjects[value];
                  }
                  return obj;
                })
              );

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
      dataIndex: "subName",
      key: "subName",

      render: (subName, record, rowIndex) => {
        const mySelect = subName.split("*").map((value, index) => {
          return (
            <Select.Option key={index} id={index} value={value}>
              {value}
            </Select.Option>
          );
        });
        return (
          <Select
            style={{ width: 190 }}
            value={dataSource[rowIndex].selectedSubName}
            onChange={value => {
              const newDataSource = [...dataSource];
              setDataSource(
                newDataSource.map((obj, idx) => {
                  if (idx === rowIndex) {
                    obj.selectedSubName = value;
                    obj.selectedSubId = Object.keys(subObjects).find(
                      key => subObjects[key] === value
                    );
                  }
                  return obj;
                })
              );

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
          defaultOpenValue={moment("00:00", "HH:mm")}
          format={"HH:mm"}
          value={dataSource[rowIndex].startTime}
          onChange={value => {
            const newDataSource = [...dataSource];
            setDataSource(
              newDataSource.map((obj, idx) => {
                if (idx === rowIndex) {
                  obj.startTime = value;
                  if (obj.endTime) {
                    if (obj.startTime === null) {
                      obj.workTime = "00:00";
                    } else {
                      const startHr = Number(
                        obj.startTime.toString().slice(16, 18)
                      );
                      const startMin = Number(
                        obj.startTime.toString().slice(19, 21)
                      );
                      const endHr = Number(
                        obj.endTime.toString().slice(16, 18)
                      );
                      const endMin = Number(
                        obj.endTime.toString().slice(19, 21)
                      );

                      const _d = (endHr - startHr) * 60 + endMin - startMin;
                      const dHr = Math.floor(_d / 60);
                      const dMin = _d % 60;

                      const dHR =
                        dHr >= 10 ? `${dHr}` : dHr < 0 ? "00" : `0${dHr}`;
                      const dMIN =
                        dMin >= 10 ? `${dMin}` : dMin < 0 ? "00" : `0${dMin}`;

                      obj.workTime = `${dHR}:${dMIN}`;
                    }
                  }
                }
                return obj;
              })
            );
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
          defaultOpenValue={moment("00:00", "HH:mm")}
          format={"HH:mm"}
          value={dataSource[rowIndex].endTime}
          onChange={value => {
            const newDataSource = [...dataSource];
            setDataSource(
              newDataSource.map((obj, idx, arr) => {
                if (idx === rowIndex) {
                  obj.endTime = value;
                  if (obj.startTime) {
                    if (obj.endTime === null) {
                      obj.workTime = "00:00";
                    } else {
                      const startHr = Number(
                        obj.startTime.toString().slice(16, 18)
                      );
                      const startMin = Number(
                        obj.startTime.toString().slice(19, 21)
                      );
                      const endHr = Number(
                        obj.endTime.toString().slice(16, 18)
                      );
                      const endMin = Number(
                        obj.endTime.toString().slice(19, 21)
                      );

                      const _d = (endHr - startHr) * 60 + endMin - startMin;
                      const dHr = Math.floor(_d / 60);
                      const dMin = _d % 60;

                      const dHR =
                        dHr >= 10 ? `${dHr}` : dHr < 0 ? "00" : `0${dHr}`;
                      const dMIN =
                        dMin >= 10 ? `${dMin}` : dMin < 0 ? "00" : `0${dMin}`;

                      obj.workTime = `${dHR}:${dMIN}`;
                    }
                  }
                  if (
                    newDataSource[rowIndex + 1] &&
                    (arr[idx + 1].startTime === null ||
                      arr[idx + 1].startTime < obj.endTime)
                  ) {
                    arr[idx + 1].startTime = obj.endTime;
                  }
                }
                return obj;
              })
            );
          }}
        />
      )
    },
    {
      title: "Work Time",
      dataIndex: "workTime",
      key: "workTime",
      render: (text, record, rowIndex) => (
        <Input disabled value={dataSource[rowIndex].workTime} />
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
      projectId: projectKeys,
      selectedProjectId: "--Choose--",
      projectName: projectValues,
      selectedProjectName: "--Choose--",
      subId: subKeys,
      selectedSubId: "--Choose--",
      subName: subValues,
      selectedSubName: "--Choose--",
      startTime: null,
      endTime: null,
      workTime: "00:00",
      status: null,
      comment: null
    };

    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const onDelete = key => {
    const newDataSource = [...dataSource];
    setDataSource(newDataSource.filter(item => item.key !== key));
  };

  return (
    <div>
      <Button onClick={onAdd} type="primary" style={{ marginBottom: 16 }}>
        Add a row
      </Button>
      <Table
        components={components}
        columns={newColumns}
        dataSource={dataSource}
        rowKey={record => record.key}
        size="middle"
        bordered
        pagination={false}
      />
    </div>
  );
};

export default AppTable;
