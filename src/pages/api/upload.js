import multer from 'multer';
import path from 'path';
import moment from 'moment';
import exceljs from 'exceljs';

const storage = multer.diskStorage({
  destination: 'public/upload',
  filename: function (req, file, cb) {
    const randomNum = Math.floor(Math.random() * (999 - 100 + 1) + 100);
    const timestamp = moment().format('YYYY_MM_DD-HHmmss');
    const extname = path.extname(file.originalname);
    const fileName = `${timestamp}_${randomNum}${extname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await new Promise((resolve, reject) => {
        upload.single('file')(req, res, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });

      if (!req.file) {
        throw new Error('No file uploaded.');
      }

      const { filename } = req.file;
      const filePath = path.join('public/upload', filename);
      const workbook = new exceljs.Workbook();
      await workbook.xlsx.readFile(filePath);
      const worksheet = workbook.worksheets[0];
      const cells = [];

      worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
        const rowData = [];
        const rowDataAdd = [];
        let rowDataResult = [];
        let rowDataResultPart = [];
        row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
          const cellValue = cell.value;
          const trimmedValue = cellValue ? cellValue.trim() : cellValue; // Trim the cell value if it exists
          if(trimmedValue=='เปลี่ยนหัวพิมพ์'){
            rowDataResult = "- Part อะไหล่";
            rowDataResultPart = "FA25010 PRINT HEAD, IE343J-1";
            rowDataAdd.push(rowDataResult);
            rowDataAdd.push(rowDataResultPart);
          }
          if(trimmedValue=='เปลี่ยน duct'){
            rowDataResult = "- Part อะไหล่";
            rowDataResultPart = "1906402 DUCT,CR ASSY A CG44 ESL,B;ASP";
            rowDataAdd.push(rowDataResult);
            rowDataAdd.push(rowDataResultPart);
          }
          rowData.push(trimmedValue);
        });
      
        if (rowData.length === 0) {
          return;
        }
      
        cells.push(rowData);
        cells.push(rowDataAdd);
      });
      
      const headers = cells.shift(); // Extract headers from the first row
      const data = cells.map((row, rowIndex) => {
        const rowData = {};
        row.forEach((cell, colIndex) => {
          rowData[`col-${colIndex}`] = cell; // Use column index as the key
        });
        return { ...rowData, key: `row-${rowIndex}` };
      });
      
      console.log(cells);
      res.status(200).json({ uploadedFileName: filename, data: cells });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error reading the file.' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
