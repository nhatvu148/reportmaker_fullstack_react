const Excel = require("exceljs");

const CreateReport = async (name, sunday, results) => {
  const workbook = new Excel.Workbook();

  const urlIn = "./public/Format.xlsx";
  const urlOut = "./public/";
  // console.log(results);

  await workbook.xlsx.readFile(urlIn);

  // Daily History
  const worksheet = workbook.getWorksheet(1);

  for (let i = 2; i <= results.length + 1; i++) {
    const row = worksheet.getRow(i);

    for (let j = 1; j <= 16; j++) {
      row.getCell(j).value = Object.values(results[i - 2])[j - 1];
    }

    row.commit();
  }

  await workbook.xlsx.writeFile(
    `${urlOut}${sunday}_${(
      Number.parseInt(sunday) + 6
    ).toString()}_${name}.xlsx`
  );
};

module.exports = CreateReport;
