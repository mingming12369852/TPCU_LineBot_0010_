const linebot = require('linebot');
const express = require('express');
var fs = require("fs")
const version = 'v0.1.7';
// const id_mod = require('model/student_ID');

//本機測試
// const bot = linebot({
//   channelId: '1653984063',
//   channelSecret: '2cf7831a10e737ed5a961f55b554aba8',
//   channelAccessToken: 'xPq70ID8sUOuyW4eoWYRt9Q0WpIk3VZ0ihdk28s9geYCdi6d/9dxDWPaufAvrW/GjdxSKN0Zf/f9A1YMYteFUlFrOaQ0ZFeBRpGHF1Vu7lxs5rjRdliKsOip8vdADQonaSIluZO3VChaN4RRvB5M4wdB04t89/1O/w1cDnyilFU='
// });

// 正式上線
const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
});

const app = express();

const linebotParser = bot.parser();

app.get('/', function(req, res) {
  res.send("Helo");

});
app.post('/linewebhook/', linebotParser);

// 當有人傳送訊息給Bot時
bot.on('message', function(event) {

  //將文字以外

  if (event.message.type == 'text') {
    var userMessage = event.message.text;
    if (userMessage == '測試選單') {
      event.reply({
        "type": "template",
        "altText": "This is a buttons template",
        "template": {
          "type": "buttons",
          "thumbnailImageUrl": "https://example.com/bot/images/image.jpg",
          "imageAspectRatio": "rectangle",
          "imageSize": "cover",
          "imageBackgroundColor": "#FFFFFF",
          "title": "Menu",
          "text": "Please select",
          "defaultAction": {
            "type": "uri",
            "label": "View detail",
            "uri": "http://example.com/page/123"
          },
          "actions": [{
              "type": "postback",
              "label": "Buy",
              "data": "action=buy&itemid=123"
            },
            {
              "type": "postback",
              "label": "Add to cart",
              "data": "action=add&itemid=123"
            },
            {
              "type": "uri",
              "label": "View detail",
              "uri": "http://example.com/page/123"
            }
          ]
        }
      });
    } else if (userMessage == 'debug') {
      event.reply(['輸入："測試選單"', '輸入：長度17的字串', '輸入："繳交作業"', '當前版本：' + version]);

    } else if (userMessage == '繳交作業') {
      event.reply(['1.請輸入你及你的組員學號', '範例："12345678 12345678"']);

    } else if (userMessage.length == 17) {
      event.reply(["2.請依照題目順序上傳影片，謝謝", '[影片上傳上無功能，請勿上傳。]'],['送出檔案後直接關閉即可。謝謝^^']);
    } else if (userMessage.length != 17) {
      event.reply(['1.請輸入你及你的組員學號', '範例："12345678 12345678"']);
    }
  } else {
    event.message.content().then(function(content) {
      console.log(content.toString('base64'));
    });
  }



  // else if (userMessage.length == 17) {
  //   event.reply(["2.請依照題目順序上傳影片，謝謝", '[影片上傳上無功能，請勿上傳。]', '[開發人員請輸入："完成" ]']);
  // } else if (userMessage.length != 17) {
  //   event.reply(['1.請輸入正確的學號格式', '範例："12345678 12345678"']);
  // }



  // // event.message.text是使用者傳給bot的訊息
  // // 準備要回傳的內容
  // switch (userMessage) {
  //   //======================================用戶對話區
  //   case "如何使用":
  //     event.reply('1.請輸入正確的學號格式', '範例："12345678 12345678"');
  //     break;
  //
  //   case '版本':
  //     event.reply('v0.1.7');
  //     break;
  //   case 'XD':
  //     // var replyMsg = '請輸入正確的學號格式';
  //
  //
  //     break;
  //
  //     //======================================上繳功能區
  //   case '繳交作業':
  //     event.reply(["2.請依照題目順序上傳影片，謝謝", '[影片上傳上無功能，請勿上傳。]']);
  //
  //     break;
  //   case userMessage.length == 17:
  //     event.reply();
  //
  //     break;
  //   default:
  //     event.reply('我不知道你在說甚麼:P');
  //     event.reply('你可以說話大聲一點嗎，我聽得不是很清楚..');
  //     event.reply('你是在大聲甚麼拉!!!!!');
  //
  // }



});


// bot.on('message', function(id) {
//
//   if (userMessage.length != 17) {
//     event.reply("格式錯誤 \n 範例：'12345678 12345678' ", );
//
//   } else if (userMessage.length == 17) {
//     event.reply("2.請依照題目順序上傳影片。\n 然後不要真的傳影片給我。功能尚未完成... ");
//     break;
//   } else if (userMessage.length == "取消") {
//     event.reply("ok");
//
//   }
//
// });






app.listen(process.env.PORT || 80, function() {
  console.log('LineBot is running Time.');
});



// event.reply(replyMsg).then(function(data) {
//   // 當訊息成功回傳後的處理
// }).catch(function(error) {
//   // 當訊息回傳失敗後的處理
// });
