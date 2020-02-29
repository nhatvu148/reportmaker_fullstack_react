import { projectKeys, projectValues } from "./ProjectObj";
import { subKeys, subValues } from "./SubObj";

const Data = [...Array(2).keys()].reduce((dataArr, index) => {
  dataArr.push({
    key: index,
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
  });
  return dataArr;
}, []);

export default Data;
