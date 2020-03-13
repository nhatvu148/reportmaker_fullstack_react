const Excel = require("exceljs");

const CreateReport = async () => {
  const workbook = new Excel.Workbook();

  const urlIn = "./public/Format.xlsx";
  const urlOut = "./public/Report.xlsx";

  await workbook.xlsx.readFile(urlIn);

  // Daily History
  const worksheet = workbook.getWorksheet(1);

  for (let i = 2; i < 5; i++) {
    const row = worksheet.getRow(i);

    for (let j = 1; j < 17; j++) {
      row.getCell(j).value = i * j;
    }

    row.commit();
  }

  await workbook.xlsx.writeFile(urlOut);
};

module.exports = CreateReport;
