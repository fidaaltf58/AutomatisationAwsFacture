
import * as XLSX from "xlsx";

import { saveAs } from "file-saver";

export const exportToExcel = (data) => {
  const fileName = "table_data.xlsx";
  const worksheetName = "Sheet1";
  const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
  const columns = Object.keys(data[0]);

  const dataArray = data.map((item) => Object.values(item));

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.aoa_to_sheet([columns, ...dataArray]);

  XLSX.utils.book_append_sheet(workbook, worksheet, worksheetName);

  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

  const blob = new Blob([excelBuffer], { type: fileType });
  saveAs(blob, fileName);
};
