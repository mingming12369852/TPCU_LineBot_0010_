var request = require("request");
var google_DriveapiUrl = 'https://script.google.com/macros/s/AKfycbyZnM23QAHOvMHBTc96Mxi122gtMGnglYDb2PRS2hWZsCkMgks/exec';
var fileType = 'video/mp4'; // 不能更改

module.exports = {
  Hello: function(a) {
    console.log("Im" + a);
    console.log(a);
  },
  UpDataInGoogleDrive: function(fileName, date, base64Data) {
    var parameter = {
      fileName: fileName,
      fileType: fileType,
      date: date,
      base64Data: base64Data
    }
    request({
      url: google_DriveapiUrl,
      method: "GET",
      qs: parameter
    }, function(error, response, body) {
      console.log(body);
      // console.log(error);
      // console.log('getO???K');
      // console.log(parameter);
    });
  }
}





// date = String(date);


// DriveLog();







//=================
