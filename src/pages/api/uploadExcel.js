import multer from 'multer';
import path from 'path';
import moment from 'moment';
import exceljs from 'exceljs';

const storage = multer.diskStorage({
  destination: 'public/upload/lfp',
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
        const filePath = path.join('public/upload/lfp', filename);
        const workbook = new exceljs.Workbook();
        await workbook.xlsx.readFile(filePath);

        const worksheetError = workbook.worksheets[2];
        let type = "";
        let errorContent = "";
        let timeStamp = "";
        worksheetError.eachRow({ includeEmpty: true }, (row, rowNumber) => {
            if (rowNumber === 3) {
                // Extract data from the first row
                const rowData = [];
                row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
                  const cellValue = cell.value;
                  let trimmedValue = "";
                  if (typeof cellValue === 'string') {
                      trimmedValue = cellValue.trim();
                      rowData.push(trimmedValue);
                  } else {
                      rowData.push(cellValue); // If not a string, push the value as it is
                  }
                rowData.push(trimmedValue);
                });
                type = rowData[0];
                errorContent = rowData[1];
                timeStamp = rowData[2];
                return false;
            }
        });
        const errData = [
            {
              no: 1, // You can set the No value as per your requirement
              symptom: type, // Assuming type corresponds to 'Symptom / Detail'
              remedy: errorContent, // Assuming errorContent corresponds to 'Remedy'
              part: timeStamp, // Assuming timeStamp corresponds to 'Part Code'
            },
          ];

        const worksheet = workbook.worksheets[0];
        const cells = [];
        worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
            const rowData = [];
            row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
                const cellValue = cell.value;
                const trimmedValue = cellValue ? cellValue.trim() : cellValue;
                if(trimmedValue !== ""){
                    rowData.push(trimmedValue);
                }
            });
        
            if (rowData.length === 1 || rowData.length === 0) {
                return;
            }else{
                cells.push(rowData);
                //cells.push(rowDataAdd);
            }
        });
      
        const headers = cells.shift(); 
        const data = cells
            .filter(row => row.length > 0) // Remove empty arrays
            .map((row, rowIndex) => {
            const rowData = {};
            row.forEach((cell, colIndex) => {
                rowData[`col-${colIndex}`] = cell; 
            });
            return { ...rowData, key: `row-${rowIndex}` };
            });
      console.log(cells);
      console.log(errData);
      const addErrordata = [];
      const errorShow = [];
      let countErrorShow = 1;
      errorShow.push({
        no: 1, // You can set the No value as per your requirement
        symptom: type, // Assuming type corresponds to 'Symptom / Detail'
        remedy: errorContent, // Assuming errorContent corresponds to 'Remedy'
        part: timeStamp, // Assuming timeStamp corresponds to 'Part Code'
      });
      countErrorShow+=1;
      cells.forEach((row, rowIndex) => {
        const [symptom, remedy, limit, , , , part] = row; // Destructure relevant values
        const numericRemedy = parseInt(remedy.replace(/,/g, ''), 10);
        const numericThreshold = parseInt(limit.replace(/,/g, ''), 10);
        let countPumpCounter = 0;
        if (symptom.includes('Pump Counter')){
          countPumpCounter += 1;
        }
        if (symptom.includes('Pump Cap Unit (Full)') && (numericRemedy >= numericThreshold)) {
          errorShow.push({
            no: countErrorShow ,
            symptom,
            remedy: remedy.split(' ')[0], 
            part: 'ปั้มซ้าย'
          });
          countErrorShow+=1;
        }
        if (symptom.includes('Total Print Dimension') && (numericRemedy >= numericThreshold)) {
          errorShow.push({
            no: countErrorShow ,
            symptom,
            remedy: remedy.split(' ')[0], 
            part: 'เปลี่ยนหัวพิมพ์'
          });
          countErrorShow+=1;
        }
        if (symptom.includes('CR passes') && (numericRemedy >= numericThreshold)) {
          errorShow.push({
            no: countErrorShow ,
            symptom,
            remedy: remedy.split(' ')[0], 
            part: 'เปลี่ยน cr moter'
          });
          countErrorShow+=1;
        }
        if (symptom.includes('Ink Tube(Pass)') && (numericRemedy >= numericThreshold)) {
          errorShow.push({
            no: countErrorShow ,
            symptom,
            remedy: remedy.split(' ')[0], 
            part: 'ท่อหมึก'
          });
          countErrorShow+=1;
        }
        if (symptom.includes('Buffer Counter') && (numericRemedy >= numericThreshold)) {
          errorShow.push({
            no: countErrorShow ,
            symptom,
            remedy: remedy.split(' ')[0],
            part: 'เปลี่ยน duct'
          });
          countErrorShow+=1;
        }
        if (symptom.includes('Pump Counter') && (numericRemedy >= numericThreshold) && countPumpCounter==1) {
          errorShow.push({
            no: countErrorShow ,
            symptom,
            remedy: remedy.split(' ')[0],
            part: 'ink holder ขวา'
          });
          countErrorShow+=1;
        }
        if (symptom.includes('Pump Counter') && (numericRemedy >= numericThreshold) && countPumpCounter==2) {
          errorShow.push({
            no: countErrorShow ,
            symptom,
            remedy: remedy.split(' ')[0],
            part: 'ink holder ซ้าย'
          });
          countErrorShow+=1;
        }
        if (symptom.includes('Pump Cap Unit (Home)') && (numericRemedy >= numericThreshold)) {
          errorShow.push({
            no: countErrorShow ,
            symptom,
            remedy: remedy.split(' ')[0], 
            part: 'ปั้ม ขวา'
          });
          countErrorShow+=1;
        }
        if (symptom.includes('Pump Cap Unit (Full)') && (numericRemedy >= numericThreshold)) {
          errorShow.push({
            no: countErrorShow ,
            symptom,
            remedy: remedy.split(' ')[0], 
            part: 'ปั้มซ้าย'
          });
          countErrorShow+=1;
        }
      });
      console.log('-->');
      console.log(errorShow);

      res.status(200).json({ uploadedFileName: filename, data: cells, errorData:errData,errorShow:errorShow  });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error reading the file.' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
