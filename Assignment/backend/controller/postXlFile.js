const multer     = require('multer');
const XLSX       = require('xlsx');
const excelModel = require("../model/excelData");

const postXl = async (req,res)=>{
  console.log("req.file" ,req.file);
  var workbook =  XLSX.readFile(req.file.path);
    var sheet_namelist = workbook.SheetNames;
    var x=0;
    sheet_namelist.forEach(element => {
        var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_namelist[x]]);
        // console.log(xlData);
        excelModel.insertMany(xlData)
        .then(function(){
          console.log("Successfully saved defult items to DB");
        })
        .catch(function (err) {
          console.log(err);
        });
        x++;
    });

}

module.exports = { postXl};

