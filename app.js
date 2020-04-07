const express = require('express');
const fs = require("fs")
const request = require("request");
const linebot = require('linebot');
const upData = require("./model/DriveAPI.js");
const talk = require("./model/talk.js");
const student_ID = require("./model/student_ID.js");

var Today = new Date();

const version = 'v0.1.7';
var status = 0; //對話狀態
var time = 0; //用戶傳送影片的順序

var excelUrl = 'https://docs.google.com/spreadsheets/d/15H4JK7PgH134nZOMDvP5M2Vd8dOr2O9H50BQjeW8_UQ/edit?usp=sharing';
var excelName = 'MessageLog';
var googleExcel_apiUrl = 'https://script.google.com/macros/s/AKfycbzzpr1QqqMZNUmttsX2S7n_pK4Y8wMSf-4l8fYf/exec';
var googleDrive_apiUrl = 'https://script.google.com/macros/s/AKfycbw56sVgzNXEVSXyWOeprWlmx-RXnvtH906JNu7hpdPxmQDYREM/exec';

var lineToken;
var date = Today.getFullYear() + '/' + (Today.getMonth() + 1) + '/' + Today.getDate();
var studentNumber;
var mp4Name;
var base64Code;

// 本機測試
// const bot = linebot({
//   channelId: '1653984063',
//   channelSecret: '2cf7831a10e737ed5a961f55b554aba8',
//   channelAccessToken: 'xPq70ID8sUOuyW4eoWYRt9Q0WpIk3VZ0ihdk28s9geYCdi6d/9dxDWPaufAvrW/GjdxSKN0Zf/f9A1YMYteFUlFrOaQ0ZFeBRpGHF1Vu7lxs5rjRdliKsOip8vdADQonaSIluZO3VChaN4RRvB5M4wdB04t89/1O/w1cDnyilFU='
// });

// // 正式上線
const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
});

var mueu = {
  "type": "bubble",
  "hero": {
    "type": "image",
    "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/01_1_cafe.png",
    "size": "full",
    "aspectRatio": "20:13",
    "aspectMode": "cover",
    "action": {
      "type": "uri",
      "uri": "http://linecorp.com/"
    }
  },
  "body": {
    "type": "box",
    "layout": "vertical",
    "contents": [{
        "type": "text",
        "text": "Brown Cafe",
        "weight": "bold",
        "size": "xl"
      },
      {
        "type": "box",
        "layout": "baseline",
        "margin": "md",
        "contents": [{
            "type": "icon",
            "size": "sm",
            "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
          },
          {
            "type": "icon",
            "size": "sm",
            "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
          },
          {
            "type": "icon",
            "size": "sm",
            "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
          },
          {
            "type": "icon",
            "size": "sm",
            "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png"
          },
          {
            "type": "icon",
            "size": "sm",
            "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gray_star_28.png"
          },
          {
            "type": "text",
            "text": "4.0",
            "size": "sm",
            "color": "#999999",
            "margin": "md",
            "flex": 0
          }
        ]
      },
      {
        "type": "box",
        "layout": "vertical",
        "margin": "lg",
        "spacing": "sm",
        "contents": [{
            "type": "box",
            "layout": "baseline",
            "spacing": "sm",
            "contents": [{
                "type": "text",
                "text": "Place",
                "color": "#aaaaaa",
                "size": "sm",
                "flex": 1
              },
              {
                "type": "text",
                "text": "Miraina Tower, 4-1-6 Shinjuku, Tokyo",
                "wrap": true,
                "color": "#666666",
                "size": "sm",
                "flex": 5
              }
            ]
          },
          {
            "type": "box",
            "layout": "baseline",
            "spacing": "sm",
            "contents": [{
                "type": "text",
                "text": "Time",
                "color": "#aaaaaa",
                "size": "sm",
                "flex": 1
              },
              {
                "type": "text",
                "text": "10:00 - 23:00",
                "wrap": true,
                "color": "#666666",
                "size": "sm",
                "flex": 5
              }
            ]
          }
        ]
      }
    ]
  },
  "footer": {
    "type": "box",
    "layout": "vertical",
    "spacing": "sm",
    "contents": [{
        "type": "button",
        "style": "link",
        "height": "sm",
        "action": {
          "type": "uri",
          "label": "CALL",
          "uri": "https://linecorp.com"
        }
      },
      {
        "type": "button",
        "style": "link",
        "height": "sm",
        "action": {
          "type": "uri",
          "label": "WEBSITE",
          "uri": "https://linecorp.com"
        }
      },
      {
        "type": "spacer",
        "size": "sm"
      }
    ],
    "flex": 0
  }
};

const app = express();

const linebotParser = bot.parser();

app.get('/', function(req, res) {
  res.send("Helo");
});

app.post('/linewebhook/', linebotParser);

//啟動LineBot 機器人 對話狀態
RunLineBot();


function RunLineBot() {
  bot.on('message', function(event) {
    console.log(event);

    var userSay = event.message.text;
    //判斷 用戶傳送的訊息的格式
    switch (status) {
      case -1:
        if (userSay == '說話') {
          event.reply(['&!#(*$(!#*&@^()))', "終於可以說話了. "]);
          status = 0;
        }

        break;

      case 0:

        switch (event.message.type) {
          case 'text':

            switch (event.message.text) {
              case '如何使用？':
                event.reply('請輸入繳交資料並以格式輸入');

                break;
              case '繳交資料':
                event.reply(['請輸入學號....', '17碼 \n 例:"12345678 12345678"', '取消上繳資料輸入：取消']);
                status = 1;
                break;

              case '閉嘴':
                event.reply(['好啦！幹兇屁']);
                status = -1;
                console.log(status);
                break;
              case 'admin':
                status = 'upvideo';
                break;

              default:

                var number = Math.floor(Math.random() * 92) + 1;
                event.reply(talk.data[number]);

                event.reply();
            }


            break;


        }

        break;

      case 1:

        if (userSay.length == 17) {
          // console.log('==END==');
          status = 0;
          event.reply(['輸入正確....', '請開始上傳影片']);
          studentNumber = userSay;
          status = 'upvideo';
          time = 0;
        } else if (userSay == "取消") {
          event.reply(['正在關閉連線...']);
          console.log('==END==');
          status = 0;
          console.log(status);
        } else if (userSay.length != 17) {
          event.reply(['輸入格式錯誤....']);

        }


        break;

      case 'upvideo':

        if (event.message.type == 'text') {
          event.reply(['請上傳影片', '或輸入"完成"來離開操作']);

          if (event.message.text == '完成') {
            event.reply(['正在關閉連線...']);
            status = 0;
          }

        } else if (event.message.type == 'video') {

          time++;
          studentNumber = studentNumber.replace(/\s/g, "_");
          mp4Nmae = studentNumber + '_' + time;
          lineToken = event.source.userId;
          event.reply(['已經接收到影片', '名稱：' + studentNumber + '_' + time]);


          event.message.content().then(function(content) {
            // console.log(content);

            base64Code = content.toString('base64');


            console.log('>>>>>>>>>>>>>>>>>.||||||||||||||||||||*' + base64Code);
            upData.UpDataInGoogleDrive(mp4Nmae, date, base64Data);
            // console.log(base64Code);
            // base64Code = 'XD';
            // ExcelLog(lineToken, date, studentNumber, mp4Nmae, base64Code);
          });



          // lineToken, date, studentNumber, mp4Name, base64Code

        }
        break;
    }





  });
}

app.listen(process.env.PORT || 80, function() {
  console.log('LineBot is running Time.');
});



//============================



function ExcelLog(lineToken, date, studentNumber, mp4Name, base64Code) {

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

function DriveLog(fileName, fileType, base64Data) {
  var parameter = {
    sheetUrl: excelUrl,

    fileName: fileName,
    fileType: fileType,
    base64Data: base64Data

  }
  request({
    url: googleExcel_apiUrl,
    method: "GET",
    qs: parameter
  }, function(error, response, body) {
    console.log(body);
    // console.log(error);
    console.log('getOK');
    console.log(parameter);
  });
}
