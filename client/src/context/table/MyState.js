import React, { useReducer, useContext } from "react";
import axios from "axios";
import MyContext from "./myContext";
import AuthContext from "../auth/authContext";
import MyReducer from "./myReducer";
import {
  GET_PROJECT,
  GET_SUB,
  GET_DATA_FROM_DATE,
  SET_LOADING,
  CLEAR_LOGOUT
} from "../types";
import moment from "moment";

const MyState = props => {
  const authContext = useContext(AuthContext);

  const { user } = authContext;

  const initialState = {
    selectedDate: moment(),
    projects: [{ pjid: "--Choose--", pjname_en: "--Choose--" }],
    subs: [{ subid: "--Choose--", subname_en: "--Choose--" }],
    loading: false,
    dataSource: []
  };

  const [state, dispatch] = useReducer(MyReducer, initialState);

  const getProject = async () => {
    setLoading();
    const res = await axios.get("api/projects");
    dispatch({ type: GET_PROJECT, payload: res.data.data });
  };

  const getSub = async () => {
    setLoading();
    const res = await axios.get("api/subs");
    dispatch({ type: GET_SUB, payload: res.data.data });
  };

  const getDataFromDate = async (selectedDate, projects, subs) => {
    if (selectedDate !== null) {
      setLoading();

      const workdate = selectedDate
        .format("YYYY-MM-DD")
        .split("-")
        .join("");

      const name = user && user.name;

      const res = await axios.get(
        `api/personal?name=${name}&workdate=${workdate}`
      );
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
      dispatch({ type: GET_DATA_FROM_DATE, payload: newData });
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
        loading: state.loading,
        dispatch,
        getProject,
        getSub,
        getDataFromDate,
        clearLogout
      }}
    >
      {props.children}
    </MyContext.Provider>
  );
};

export default MyState;
