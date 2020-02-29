import React, { useReducer } from "react";
import axios from "axios";
import MyContext from "./myContext";
import MyReducer from "./myReducer";
import {
  GET_PROJECT,
  GET_DATA_FROM_DATE,
  SAVE_DATA,
  SET_LOADING,
  CLEAR_LOGOUT,
  ROOT_PAGE,
  WEEK_PAGE,
  MONTH_PAGE,
  DAY_PAGE
} from "../types";
import moment from "moment";

const MyState = props => {
  const initialState = {
    selectedDate: moment(),
    projects: [{ pjid: "--Choose--", pjname_en: "--Choose--" }],
    subs: [{ subid: "--Choose--", subname_en: "--Choose--" }],
    loading: false,
    dataSource: [],
    oldCount: 0,
    rowCount: 0,
    rootPageClicked: true,
    weekPageClicked: true,
    monthPageClicked: true,
    dayPageClicked: true,
    selectedKeys: []
  };

  const [state, dispatch] = useReducer(MyReducer, initialState);

  const onRootClicked = () => {
    dispatch({ type: ROOT_PAGE });
  };

  const onWeekClicked = () => {
    dispatch({ type: WEEK_PAGE });
  };

  const onMonthClicked = () => {
    dispatch({ type: MONTH_PAGE });
  };

  const onDayClicked = () => {
    dispatch({ type: DAY_PAGE });
  };

  const getProject = async () => {
    // setLoading();
    try {
      const res1 = await axios.get("api/projects");
      const res2 = await axios.get("api/subs");

      dispatch({
        type: GET_PROJECT,
        payload: res1.data.data,
        payload2: res2.data.data
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getDataFromDate = async (name, selectedDate) => {
    setLoading();
    const res1 = await axios.get("api/projects");
    const res2 = await axios.get("api/subs");

    // dispatch({
    //   type: GET_PROJECT,
    //   payload: res1.data.data,
    //   payload2: res2.data.data
    // });
    const projects = res1.data.data;
    const subs = res2.data.data;

    if (selectedDate !== null) {
      const workdate = selectedDate
        .format("YYYY-MM-DD")
        .split("-")
        .join("");

      // const name = user && user.name;

      const res = await axios.get(`api/personal`, {
        params: {
          name,
          workdate
        }
      });

      // await setTimeout(() => { alert("Hello"); }, 3000);

      const newData = res.data.data.map((item, index) => {
        return {
          key: index,
          selectedProjectId: item.pjid,
          selectedProjectName: projects.find(
            element => element.pjid === item.pjid
          ).pjname_en,
          selectedSubId: item.subid,
          selectedSubName: subs.find(element => element.subid === item.subid)
            .subname_en,
          startTime: moment(
            `"${item.starthour}:${item.startmin}:00"`,
            "HH:mm:ss"
          ),
          endTime: moment(`"${item.endhour}:${item.endmin}:00"`, "HH:mm:ss"),
          workTime: `${
            parseInt(item.worktime / 60) < 10
              ? "0" + parseInt(item.worktime / 60).toString()
              : parseInt(item.worktime / 60)
          }:${
            item.worktime % 60 < 10
              ? "0" + (item.worktime % 60).toString()
              : item.worktime % 60
          }`,
          status: null,
          comment: item.comment
        };
      });
      // console.log(newData);
      dispatch({
        type: GET_DATA_FROM_DATE,
        payload: newData,
        dataLength: newData.length
      });
    }
  };

  const onSave = async (oldCount, dataSource, name, selectedDate) => {
    if (selectedDate !== null) {
      setLoading();

      const workdate = selectedDate
        .format("YYYY-MM-DD")
        .split("-")
        .join("");

      if (oldCount === 0) {
        for (let i = 0; i < dataSource.length; i++) {
          const {
            selectedProjectId,
            selectedProjectName,
            selectedSubId,
            selectedSubName,
            comment,
            workTime,
            startTime,
            endTime
          } = dataSource[i];

          // INSERT DATA
          await axios.post(`api/projects/add`, {
            params: {
              name,
              workdate,
              count: i + 1,
              pjid: selectedProjectId,
              pjname: selectedProjectName,
              subid: selectedSubId,
              subname: selectedSubName,
              comment: comment,
              worktime:
                parseInt(workTime.slice(0, 2)) * 60 +
                parseInt(workTime.slice(3, 5)),
              starthour: parseInt(startTime.toString().slice(16, 18)),
              startmin: parseInt(startTime.toString().slice(19, 21)),
              endhour: parseInt(endTime.toString().slice(16, 18)),
              endmin: parseInt(endTime.toString().slice(19, 21))
            }
          });
        }
      } else if (oldCount > 0) {
        if (dataSource.length === oldCount) {
          for (let i = 0; i < dataSource.length; i++) {
            const {
              selectedProjectId,
              selectedProjectName,
              selectedSubId,
              selectedSubName,
              comment,
              workTime,
              startTime,
              endTime
            } = dataSource[i];

            // UPDATE DATA
            const res = await axios.put(`/api/projects/update`, {
              params: {
                name,
                workdate,
                count: i + 1,
                pjid: selectedProjectId,
                pjname: selectedProjectName,
                subid: selectedSubId,
                subname: selectedSubName,
                comment: comment,
                worktime:
                  parseInt(workTime.slice(0, 2)) * 60 +
                  parseInt(workTime.slice(3, 5)),
                starthour: parseInt(startTime.toString().slice(16, 18)),
                startmin: parseInt(startTime.toString().slice(19, 21)),
                endhour: parseInt(endTime.toString().slice(16, 18)),
                endmin: parseInt(endTime.toString().slice(19, 21))
              }
            });
            console.log(res);
          }
        } else if (dataSource.length !== oldCount) {
          for (let i = 0; i < oldCount; i++) {
            // DELETE DATA
            const res = await axios.delete(`/api/projects/delete`, {
              params: {
                name,
                workdate,
                count: i + 1
              }
            });
            console.log(res);
          }

          for (let i = 0; i < dataSource.length; i++) {
            const {
              selectedProjectId,
              selectedProjectName,
              selectedSubId,
              selectedSubName,
              comment,
              workTime,
              startTime,
              endTime
            } = dataSource[i];
            console.log(dataSource[i]);

            // INSERT DATA
            const res = await axios.post(`api/projects/add`, {
              params: {
                name,
                workdate,
                count: i + 1,
                pjid: selectedProjectId,
                pjname: selectedProjectName,
                subid: selectedSubId,
                subname: selectedSubName,
                comment: comment,
                worktime:
                  parseInt(workTime.slice(0, 2)) * 60 +
                  parseInt(workTime.slice(3, 5)),
                starthour: parseInt(startTime.toString().slice(16, 18)),
                startmin: parseInt(startTime.toString().slice(19, 21)),
                endhour: parseInt(endTime.toString().slice(16, 18)),
                endmin: parseInt(endTime.toString().slice(19, 21))
              }
            });
            console.log(res);
          }
        }
      }
      dispatch({
        type: SAVE_DATA,
        dataLength: dataSource.length
      });
      console.log(dataSource);
    }
  };

  const setLoading = () => dispatch({ type: SET_LOADING });

  const clearLogout = () => {
    dispatch({ type: CLEAR_LOGOUT });
  };

  return (
    <MyContext.Provider
      value={{
        selectedDate: state.selectedDate,
        projects: state.projects,
        subs: state.subs,
        dataSource: state.dataSource,
        oldCount: state.oldCount,
        rowCount: state.rowCount,
        loading: state.loading,
        rootPageClicked: state.rootPageClicked,
        weekPageClicked: state.weekPageClicked,
        monthPageClicked: state.monthPageClicked,
        dayPageClicked: state.dayPageClicked,
        selectedKeys: state.selectedKeys,
        dispatch,
        getProject,
        getDataFromDate,
        clearLogout,
        onSave,
        onRootClicked,
        onWeekClicked,
        onMonthClicked,
        onDayClicked
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
};

export default MyState;
