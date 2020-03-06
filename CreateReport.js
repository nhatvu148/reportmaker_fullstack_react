const Excel = require("exceljs");

const CreateReport = () => {
  const workbook = new Excel.Workbook();

  const urlIn = "./public/Format.xlsx";
  const urlOut = "./public/Report.xlsx";

  workbook.xlsx.readFile(urlIn).then(function() {
    const worksheet = workbook.getWorksheet(2);

    const row = worksheet.getRow(8);
    row.getCell(2).value = "John Doe";
    row.getCell(3).value = new Date(1970, 1, 1);
    row.getCell(4).value = 1234;
    row.commit();
    return workbook.xlsx.writeFile(urlOut);
  });
};

module.exports = CreateReport;
