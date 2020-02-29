import React, { useState } from "react";
import { Button, Select, Table, TimePicker, Popconfirm, Icon } from "antd";
import moment from "moment";
import "antd/dist/antd.css";
import projects, { projectKeys, projectValues } from "./ProjectObj";
import subObjects, { subKeys, subValues } from "./SubObj";
import { EditableCell, EditableFormRow } from "./EditableCell";
import Data from "./Data";

const AppTable = () => {
  //Set States
  const ROW = {
    ofprojectId0: useState("--Choose--"), //projectIdState
    ofprojectId1: useState("--Choose--"),
    ofprojectId2: useState("--Choose--"),
    ofprojectId3: useState("--Choose--"),
    ofprojectId4: useState("--Choose--"),
    ofprojectId5: useState("--Choose--"),
    ofprojectName0: useState("--Choose--"), //projectNameState
    ofprojectName1: useState("--Choose--"),
    ofprojectName2: useState("--Choose--"),
    ofprojectName3: useState("--Choose--"),
    ofprojectName4: useState("--Choose--"),
    ofprojectName5: useState("--Choose--"),
    ofsubId0: useState("--Choose--"), //subIdState
    ofsubId1: useState("--Choose--"),
    ofsubId2: useState("--Choose--"),
    ofsubId3: useState("--Choose--"),
    ofsubId4: useState("--Choose--"),
    ofsubId5: useState("--Choose--"),
    ofsubName0: useState("--Choose--"), //subNameState
    ofsubName1: useState("--Choose--"),
    ofsubName2: useState("--Choose--"),
    ofsubName3: useState("--Choose--"),
    ofsubName4: useState("--Choose--"),
    ofsubName5: useState("--Choose--")
  };

  const OBJ = [
    {
      state: {}, //projectIdStateObj
      setState: {}
    },
    {
      state: {}, //projectNameStateObj
      setState: {}
    },
    {
      state: {}, //subIdStateObj
      setState: {}
    },
    {
      state: {}, //subNameStateObj
      setState: {}
    }
  ];

  for (let i = 0; i < Object.keys(ROW).length / 4; i++) {
    OBJ[0].state[`${i}`] = ROW[`ofprojectId${i}`][0];
    OBJ[0].setState[`${i}`] = ROW[`ofprojectId${i}`][1];

    OBJ[1].state[`${i}`] = ROW[`ofprojectName${i}`][0];
    OBJ[1].setState[`${i}`] = ROW[`ofprojectName${i}`][1];

    OBJ[2].state[`${i}`] = ROW[`ofsubId${i}`][0];
    OBJ[2].setState[`${i}`] = ROW[`ofsubId${i}`][1];

    OBJ[3].state[`${i}`] = ROW[`ofsubName${i}`][0];
    OBJ[3].setState[`${i}`] = ROW[`ofsubName${i}`][1];
  }

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
        // console.log(rowIndex);
        return (
          <Select
            // onSelect={value => console.log(value, rowIndex)}
            style={{ width: 110 }}
            value={OBJ[0].state[`${rowIndex}`]} //if index=rowID that has changed state && create state at dataSource as a value of some dataIndex or sth
            onChange={value => {
              if (OBJ[0].state[`${rowIndex}`]) {
                OBJ[0].setState[`${rowIndex}`](value);
                OBJ[1].setState[`${rowIndex}`](projects[value]);

                console.log(value, rowIndex);
              }
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
            value={OBJ[1].state[`${rowIndex}`]}
            onChange={value => {
              if (OBJ[1].state[`${rowIndex}`]) {
                OBJ[1].setState[`${rowIndex}`](value);
                OBJ[0].setState[`${rowIndex}`](
                  Object.keys(projects).find(key => projects[key] === value)
                );

                console.log(value, rowIndex);
              }
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
            value={OBJ[2].state[`${rowIndex}`]}
            onChange={value => {
              if (OBJ[2].state[`${rowIndex}`]) {
                OBJ[2].setState[`${rowIndex}`](value);
                OBJ[3].setState[`${rowIndex}`](subObjects[value]);

                console.log(value, rowIndex);
              }
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
            value={OBJ[3].state[`${rowIndex}`]}
            onChange={value => {
              if (OBJ[3].state[`${rowIndex}`]) {
                OBJ[3].setState[`${rowIndex}`](value);
                OBJ[2].setState[`${rowIndex}`](
                  Object.keys(subObjects).find(key => subObjects[key] === value)
                );

                console.log(value, rowIndex);
              }
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
      render: () => (
        <TimePicker
          defaultOpenValue={moment("00:00", "HH:mm")}
          format={"HH:mm"}
        />
      )
    },
    {
      title: "End Time",
      dataIndex: "endTime",
      key: "endTime",
      render: () => (
        <TimePicker
          defaultOpenValue={moment("00:00", "HH:mm")}
          format={"HH:mm"}
        />
      )
    },
    {
      title: "Work Time",
      dataIndex: "workTime",
      key: "workTime",
      render: () => (
        <TimePicker
          defaultValue={moment("00:00", "HH:mm")}
          format={"HH:mm"}
          disabled
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
      render: (text, record) =>
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

  const [dataSource, setDataSource] = useState([...Data]);

  const [count, setCount] = useState(dataSource.length);

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
        title: col.title
      })
    };
  });

  const onAdd = () => {
    if (count >= Object.keys(ROW).length / 4) {
      alert("Cannot add more row! " + count);
    } else {
      const newData = {
        key: count,
        projectId: projectKeys,
        projectName: projectValues,
        subId: subKeys,
        subName: subValues
      };

      setDataSource([...dataSource, newData]);
      setCount(count + 1);
    }
  };

  const onDelete = () => {
    const newDataSource = [...dataSource];
    newDataSource.pop();

    setDataSource(newDataSource);
    setCount(count - 1);
    // setDataSource(newDataSource.filter(item => item.key !== key));
  };

  return (
    <div style={{ padding: "100px 100px" }}>
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
