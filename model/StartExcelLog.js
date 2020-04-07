var request = require("request");

var excelUrl = 'https://docs.google.com/spreadsheets/d/15H4JK7PgH134nZOMDvP5M2Vd8dOr2O9H50BQjeW8_UQ/edit?usp=sharing';
var excelName = 'MessageLog';
var google_apiUrl = 'https://script.google.com/macros/s/AKfycbzzpr1QqqMZNUmttsX2S7n_pK4Y8wMSf-4l8fYf/exec';

var lineToken = 'Kuser485179732815013851'; //Line 用戶 號碼
var date = '2020/00/00' // 日期
var studentNumber = '40831111_40832333'; // 組員學號
var mp4Name = '40831111_40832222_01'; // 影片名稱
var base64Code = '1001010001'; // 影片編碼

var sheet = function() {

  var parameter = {
    sheetUrl: excelUrl,
    sheetName: excelName,

    lineToken: lineToken,
    date: date,
    studentNumber: studentNumber,
    mp4Name: mp4Name,
    base64Code: base64Code

  }
  request({
    url: google_apiUrl,
    method: "GET",
    qs: parameter
  }, function(error, response, body) {
    console.log(body);
    // console.log(error);
    console.log('getOK');
    console.log(parameter);
  });
}

sheet();
