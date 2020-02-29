import { projectKeys, projectValues } from "./ProjectObj";
import { subKeys, subValues } from "./SubObj";

const Data = [...Array(2).keys()].reduce((dataArr, index) => {
  dataArr.push({
    key: index,
    projectId: projectKeys,
    projectName: projectValues,
    subId: subKeys,
    subName: subValues
  });
  return dataArr;
}, []);

export default Data;
