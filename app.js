const linebot = require('linebot');
const express = require('express');

const id_mod = require('./student_ID');

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

// bot.on('message', function(event) {
//   event.reply(event.message.text).then(function(data) {
//     console.log('Success', data);
//   }).catch(function(error) {
//     console.log('Error', error);
//   });
// });


// 當有人傳送訊息給Bot時
bot.on('message', function(event) {
  // event.message.text是使用者傳給bot的訊息
  // 準備要回傳的內容
  var userMessage = event.message.text;

  switch (userMessage) {
    case userMessage.lenght != 17:
      var replyMsg = '格式錯誤，請再輸入一次。';
      event.reply('範例："12345678 12345678"');
      event.reply(replyMsg).then(function(data) {
        // 當訊息成功回傳後的處理
      }).catch(function(error) {
        // 當訊息回傳失敗後的處理
      });

      break;
    // case userMessage == '如何使用?':
    //   // var replyMsg = `Hello你剛才說的是:${event.message.text}`;
    //   event.reply('1.請輸入你及組員的學號');
    //   event.reply('範例："12345678 12345678"');
    //   // 透過event.reply(要回傳的訊息)方法將訊息回傳給使用者
    //   event.reply(replyMsg).then(function(data) {
    //     // 當訊息成功回傳後的處理
    //   }).catch(function(error) {
    //     // 當訊息回傳失敗後的處理
    //   });
    //   break;
    // case userMessage.lenght == 17:
    //   event.reply('2.請依照題目順序上傳影片。');
    //   event.reply('ps:然後不要真的傳影片。我還沒做好');
		//
    //   break;
    // case userMessage == '版本':
    //   event.reply('版本：0.1.7');
    //   break;

  };


});

app.listen(process.env.PORT || 80, function() {
  console.log('LineBot is running.');
});
