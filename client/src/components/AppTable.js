import React, { useState, useEffect, useContext } from "react";
import { Data1Context, Data2Context, Data3Context } from "./App";
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
import Data from "./Data";

const AppTable = () => {
  const data1 = useContext(Data1Context);
  const data2 = useContext(Data2Context);
  const data3 = useContext(Data3Context);
  //useReducer + useContext and move all states to the top level
  const [dataSource, setDataSource] = useState([...Data]);

  // useEffect(() => {
  //   setDataSource(
  //     data3.map((item, index) => {
  //       return {
  //         key: index,
  //         selectedProjectId: item.pjid,
  //         selectedProjectName: data1.find(element => element.pjid === item.pjid)
  //           .pjname_en,
  //         selectedSubId: item.subid,
  //         selectedSubName: data2.find(element => element.subid === item.subid)
  //           .subname_en,
  //         startTime: item.startHr + "" + item.startMin,
  //         endTime: item.endHr + "" + item.endMin,
  //         workTime: "00:00",
  //         status: null,
  //         comment: item.comment
  //       };
  //     })
  //   );
  // }, [data1, data2, data3]);

  const [count, setCount] = useState(dataSource.length);

  const columns = [
    {
      title: "Project ID",
      dataIndex: "selectedProjectId",
      key: "selectedProjectId",

      render: (selectedProjectId, record, rowIndex) => {
        const mySelect = data1.map((obj, index) => {
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
              const newDataSource = [...dataSource];
              setDataSource(
                newDataSource.map((obj, idx) => {
                  if (idx === rowIndex) {
                    obj.selectedProjectId = value;
                    obj.selectedProjectName = data1.find(
                      element => element.pjid === value
                    ).pjname_en;
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
      dataIndex: "selectedProjectName",
      key: "selectedProjectName",

      render: (selectedProjectName, record, rowIndex) => {
        const mySelect = data1.map((obj, index) => {
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
              const newDataSource = [...dataSource];
              setDataSource(
                newDataSource.map((obj, idx) => {
                  if (idx === rowIndex) {
                    obj.selectedProjectName = value;
                    obj.selectedProjectId = data1.find(
                      element => element.pjname_en === value
                    ).pjid;
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
      dataIndex: "selectedSubId",
      key: "selectedSubId",

      render: (selectedSubId, record, rowIndex) => {
        const mySelect = data2.map((obj, index) => {
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
              const newDataSource = [...dataSource];
              setDataSource(
                newDataSource.map((obj, idx) => {
                  if (idx === rowIndex) {
                    obj.selectedSubId = value;
                    obj.selectedSubName = data2.find(
                      element => element.subid === value
                    ).subname_en;
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
      dataIndex: "selectedSubName",
      key: "selectedSubName",

      render: (selectedSubName, record, rowIndex) => {
        const mySelect = data2.map((obj, index) => {
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
              const newDataSource = [...dataSource];
              setDataSource(
                newDataSource.map((obj, idx) => {
                  if (idx === rowIndex) {
                    obj.selectedSubName = value;
                    obj.selectedSubId = data2.find(
                      element => element.subname_en === value
                    ).subid;
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
          style={{ width: 110 }}
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
          style={{ width: 110 }}
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

    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const onDelete = key => {
    const newDataSource = [...dataSource];
    setDataSource(newDataSource.filter(item => item.key !== key));
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

  return (
    <div>
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
    </div>
  );
};

export default AppTable;
