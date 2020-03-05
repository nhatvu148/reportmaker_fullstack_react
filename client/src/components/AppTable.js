import React, { Fragment, useEffect, useContext } from "react";
import MyContext from "../context/table/myContext";
import AuthContext from "../context/auth/authContext";
import LangContext from "../context/lang/langContext";
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
  AutoComplete,
  message
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import moment from "moment";
import { EditableRow } from "./EditableCell";
import ProgressBar from "./layout/ProgressBar";

const AppTable = () => {
  const myContext = useContext(MyContext);
  const authContext = useContext(AuthContext);
  const langContext = useContext(LangContext);

  const { lang } = langContext;
  const {
    inputDailyData: {
      _addARow,
      _sameAsDate,
      _projectId,
      _projectName,
      _subId,
      _subName,
      _startTime,
      _endTime,
      _workTime,
      _status,
      _comment,
      _totalWorkTime,
      _hours
    }
  } = langContext.currentLangData;
  // console.log(langContext.currentLangData);

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
    onSave,
    isDataEdited
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
    getDataFromDate(name, selectedDate, lang);
    // eslint-disable-next-line
  }, [name, selectedDate, lang]);

  useEffect(() => {
    getDataFromSameAsDate(name, sameAsDate, lang);
    // eslint-disable-next-line
  }, [name, sameAsDate, lang]);

  const columns = [
    {
      title: _projectId,
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
            style={{ width: "110px" }}
            value={dataSource[rowIndex].selectedProjectId}
            onChange={value => {
              dispatch({
                type: SELECT_PJID,
                rowIndex,
                value,
                projects,
                lang
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
      title: _projectName,
      dataIndex: "selectedProjectName",
      key: "selectedProjectName",
      align: "center",

      render: (selectedProjectName, record, rowIndex) => {
        const mySelect = projects.map((obj, index) => {
          return (
            <Select.Option
              key={index}
              id={index}
              value={lang === "ja-JP" ? obj.pjname_jp : obj.pjname_en}
            >
              {lang === "ja-JP" ? obj.pjname_jp : obj.pjname_en}
            </Select.Option>
          );
        });
        return (
          <Select
            style={{ width: "100%" }}
            value={dataSource[rowIndex].selectedProjectName}
            onChange={value => {
              dispatch({
                type: SELECT_PJNAME,
                rowIndex,
                value,
                projects,
                lang
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
      title: _subId,
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
            style={{ width: "110px" }}
            value={dataSource[rowIndex].selectedSubId}
            onChange={value => {
              dispatch({ type: SELECT_SUBID, rowIndex, value, subs, lang });

              // console.log(dataSource[rowIndex]);
            }}
          >
            {mySelect}
          </Select>
        );
      }
    },
    {
      title: _subName,
      dataIndex: "selectedSubName",
      key: "selectedSubName",
      align: "center",

      render: (selectedSubName, record, rowIndex) => {
        const mySelect = subs.map((obj, index) => {
          return (
            <Select.Option
              key={index}
              id={index}
              value={lang === "ja-JP" ? obj.subname_jp : obj.subname_en}
            >
              {lang === "ja-JP" ? obj.subname_jp : obj.subname_en}
            </Select.Option>
          );
        });
        return (
          <Select
            style={{ width: "100%" }}
            value={dataSource[rowIndex].selectedSubName}
            onChange={value => {
              dispatch({ type: SELECT_SUBNAME, rowIndex, value, subs, lang });

              // console.log(dataSource[rowIndex]);
            }}
          >
            {mySelect}
          </Select>
        );
      }
    },
    {
      title: _startTime,
      dataIndex: "startTime",
      key: "startTime",
      align: "center",
      render: (startTime, record, rowIndex) => (
        <TimePicker
          style={{ width: "110px" }}
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
      title: _endTime,
      dataIndex: "endTime",
      key: "endTime",
      align: "center",
      render: (endTime, record, rowIndex) => (
        <TimePicker
          style={{ width: "110px" }}
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
      title: _workTime,
      dataIndex: "workTime",
      key: "workTime",
      align: "center",
      render: (text, record, rowIndex) => (
        <Input
          style={{ width: "60px" }}
          disabled
          value={dataSource[rowIndex].workTime}
        />
      )
    },
    {
      title: _status,
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (text, record, rowIndex) => (
        <InputNumber
          style={{ width: "60px" }}
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
      title: _comment,
      dataIndex: "comment",
      key: "comment",
      align: "center",
      render: (text, record, rowIndex) => (
        <AutoComplete
          style={{ width: "200px" }}
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
        style={{ margin: "0px 50px 16px 0" }}
      >
        {_addARow}
      </Button>
      <Button size="middle" style={{ margin: "0px 5px 16px 0" }}>
        {_sameAsDate}
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
          {_totalWorkTime}
        </Button>
        <Button size="large" type="dashed" style={{ margin: "2px 2px 0 0" }}>
          =
        </Button>
        <Button size="large" type="primary" style={{ marginTop: "2px" }}>
          {totalWorkTime > 0 ? totalWorkTime.toPrecision(3) : 0}{" "}
          {lang === "en-US" && totalWorkTime <= 1 ? "hour" : _hours}
        </Button>
      </div>
      {isDataEdited && (
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
              selectedDate !== null
                ? getDataFromDate(name, selectedDate, lang)
                : message.warning("Please select date!");
            }}
          >
            Cancel
          </Button>
        </div>
      )}
    </Fragment>
  );
};

export default AppTable;
