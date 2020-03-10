import { createContext } from "react";

const langContext = createContext({
  lang: "",
  currentLangData: {
    home: {
      _editProfile: "Edit Profile",
      _logOut: "Log out"
    },
    inputDailyData: {
      _inputDailyData: "Input Daily Data",
      _reportDate: "Report date:",
      _addARow: "Add a row",
      _sameAsDate: "Same as date:",
      _projectId: "Project ID",
      _projectName: "Project Name",
      _subId: "Sub ID",
      _subName: "Sub Name",
      _startTime: "Start Time",
      _endTime: "End Time",
      _workTime: "Work Time",
      _status: "Status",
      _comment: "Comment",
      _totalWorkTime: "Total Work Time",
      _hours: "hours"
    },
    weeklyReview: {
      _weeklyReview: "Weekly Review"
    },
    monthlyReview: {
      _monthlyReview: "Monthly Review"
    },
    dailyHistory: {
      _dailyHistory: "Daily History",
      _sortDate: "Sort by date",
      _date: "Date",
      _projectId: "Project ID",
      _projectName: "Project Name",
      _deadline: "Deadline",
      _expectedDate: "Expected Date",
      _subId: "Sub ID",
      _subName: "Sub Name",
      _comment: "Comment",
      _workTime: "Work Time",
      _startHour: "Start Hour",
      _startMin: "Start Min",
      _endHour: "End Hour",
      _endMin: "End Min"
    }
  },
  switchLang: () => {}
});

export default langContext;
