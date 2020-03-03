import {
  GET_PROJECT,
  GET_DATA_FROM_DATE,
  GET_DATA_FROM_SAME_AS_DATE,
  SAVE_DATA,
  SELECT_PJID,
  SELECT_PJNAME,
  SELECT_SUBID,
  SELECT_SUBNAME,
  START_TIME,
  END_TIME,
  ADD_ROW,
  DELETE_ROW,
  SET_LOADING,
  SET_DATE,
  SET_SAME_AS_DATE,
  STATUS,
  COMMENT,
  CLEAR_LOGOUT,
  ROOT_PAGE,
  WEEK_PAGE,
  MONTH_PAGE,
  DAY_PAGE,
  SELECTED_KEYS,
  RESET_PROJECTS,
  QUOTES
} from "../types";
import moment from "moment";

export default (state, action) => {
  switch (action.type) {
    case QUOTES:
      return { ...state, quotes: action.payload };

    case RESET_PROJECTS:
      return {
        ...state,
        projects: [{ pjid: "--Choose--", pjname_en: "--Choose--" }],
        subs: [{ subid: "--Choose--", subname_en: "--Choose--" }]
      };

    case SELECTED_KEYS:
      return {
        ...state,
        selectedKeys: [action.payload]
      };

    case ROOT_PAGE:
      return {
        ...state,
        rootPageClicked: !state.rootPageClicked
      };

    case WEEK_PAGE:
      return {
        ...state,
        weekPageClicked: !state.weekPageClicked
      };

    case MONTH_PAGE:
      return {
        ...state,
        monthPageClicked: !state.monthPageClicked
      };

    case DAY_PAGE:
      return {
        ...state,
        dayPageClicked: !state.dayPageClicked
      };

    case GET_PROJECT:
      return {
        ...state,
        projects: state.projects.concat(action.payload),
        subs: state.subs.concat(action.payload2)
        // loading: false
      };

    case SET_LOADING:
      return { ...state, loading: true };

    case SET_DATE:
      return { ...state, selectedDate: action.payload };

    case SET_SAME_AS_DATE:
      return { ...state, sameAsDate: action.payload };

    case GET_DATA_FROM_DATE:
      return {
        ...state,
        dataSource: action.payload,
        oldCount: action.dataLength,
        rowCount: action.dataLength,
        options: action.options,
        loading: false,
        sameAsDate: null
      };

    case GET_DATA_FROM_SAME_AS_DATE:
      return {
        ...state,
        dataSource: action.payload,
        rowCount: action.dataLength,
        options: action.options,
        loading: false
      };

    case SAVE_DATA:
      return {
        ...state,
        oldCount: action.dataLength,
        // rowCount: action.dataLength, => error when delete, save, and add new row
        loading: false
      };

    case SELECT_PJID:
      return {
        ...state,
        dataSource: state.dataSource.map((obj, idx) => {
          if (idx === action.rowIndex) {
            obj.selectedProjectId = action.value;
            obj.selectedProjectName = action.projects.find(
              element => element.pjid === action.value
            ).pjname_en;
            obj.option = state.options[action.value]
              ? state.options[action.value]
              : [];
          }
          return obj;
        })
        // option: action.option
      };

    case SELECT_PJNAME:
      return {
        ...state,
        dataSource: state.dataSource.map((obj, idx) => {
          if (idx === action.rowIndex) {
            obj.selectedProjectName = action.value;
            obj.selectedProjectId = action.projects.find(
              element => element.pjname_en === action.value
            ).pjid;
            const temp = obj.selectedProjectId;
            obj.option = state.options[temp] ? state.options[temp] : [];
          }
          return obj;
        })
      };

    case SELECT_SUBID:
      return {
        ...state,
        dataSource: state.dataSource.map((obj, idx) => {
          if (idx === action.rowIndex) {
            obj.selectedSubId = action.value;
            obj.selectedSubName = action.subs.find(
              element => element.subid === action.value
            ).subname_en;
          }
          return obj;
        })
      };

    case SELECT_SUBNAME:
      return {
        ...state,
        dataSource: state.dataSource.map((obj, idx) => {
          if (idx === action.rowIndex) {
            obj.selectedSubName = action.value;
            obj.selectedSubId = action.subs.find(
              element => element.subname_en === action.value
            ).subid;
          }
          return obj;
        })
      };

    case START_TIME:
      return {
        ...state,
        dataSource: state.dataSource.map((obj, idx) => {
          if (idx === action.rowIndex) {
            obj.startTime = action.value;
            if (obj.endTime) {
              if (obj.startTime === null) {
                obj.workTime = "00:00";
              } else {
                const startHr = Number(obj.startTime.toString().slice(16, 18));
                const startMin = Number(obj.startTime.toString().slice(19, 21));
                const endHr = Number(obj.endTime.toString().slice(16, 18));
                const endMin = Number(obj.endTime.toString().slice(19, 21));

                const _d = (endHr - startHr) * 60 + endMin - startMin;
                const dHr = Math.floor(_d / 60);
                const dMin = _d % 60;

                const dHR = dHr >= 10 ? `${dHr}` : dHr < 0 ? "00" : `0${dHr}`;
                const dMIN =
                  dMin >= 10 ? `${dMin}` : dMin < 0 ? "00" : `0${dMin}`;

                obj.workTime = `${dHR}:${dMIN}`;
              }
            }
          }
          return obj;
        })
      };

    case END_TIME:
      return {
        ...state,
        dataSource: state.dataSource.map((obj, idx, arr) => {
          if (idx === action.rowIndex) {
            obj.endTime = action.value;
            if (obj.startTime) {
              if (obj.endTime === null) {
                obj.workTime = "00:00";
              } else {
                const startHr = Number(obj.startTime.toString().slice(16, 18));
                const startMin = Number(obj.startTime.toString().slice(19, 21));
                const endHr = Number(obj.endTime.toString().slice(16, 18));
                const endMin = Number(obj.endTime.toString().slice(19, 21));

                const _d = (endHr - startHr) * 60 + endMin - startMin;
                const dHr = Math.floor(_d / 60);
                const dMin = _d % 60;

                const dHR = dHr >= 10 ? `${dHr}` : dHr < 0 ? "00" : `0${dHr}`;
                const dMIN =
                  dMin >= 10 ? `${dMin}` : dMin < 0 ? "00" : `0${dMin}`;

                obj.workTime = `${dHR}:${dMIN}`;
              }
            }
            if (
              state[action.rowIndex + 1] &&
              (arr[idx + 1].startTime === null ||
                arr[idx + 1].startTime < obj.endTime)
            ) {
              arr[idx + 1].startTime = obj.endTime;
            }
          }
          return obj;
        })
      };

    case STATUS:
      return {
        ...state,
        dataSource: state.dataSource.map((obj, idx) => {
          if (idx === action.rowIndex) {
            obj.status = action.value;
          }
          return obj;
        })
      };

    case COMMENT:
      return {
        ...state,
        dataSource: state.dataSource.map((obj, idx) => {
          if (idx === action.rowIndex) {
            obj.comment = action.value;
          }
          return obj;
        })
      };

    case ADD_ROW:
      return {
        ...state,
        dataSource: [...state.dataSource, action.newData],
        rowCount: state.rowCount + 1
      };

    case DELETE_ROW:
      return {
        ...state,
        dataSource: state.dataSource.filter(item => item.key !== action.key)
      };

    case CLEAR_LOGOUT:
      return {
        ...state,
        selectedDate: moment(),
        projects: [{ pjid: "--Choose--", pjname_en: "--Choose--" }],
        subs: [{ subid: "--Choose--", subname_en: "--Choose--" }],
        dataSource: [],
        options: {},
        option: {}
      };

    default:
      return state;
  }
};
