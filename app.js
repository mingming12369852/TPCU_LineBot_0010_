const linebot = require('linebot');
const express = require('express');

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
  if (event.message.text == '123') {
    var replyMsg = '請輸入正確的學號';
    event.reply(replyMsg).then(function(data) {
      // 當訊息成功回傳後的處理
    }).catch(function(error) {
      // 當訊息回傳失敗後的處理
    });
  } else {
    var replyMsg = `Hello你剛才說的是:${event.message.text}`;
    // 透過event.reply(要回傳的訊息)方法將訊息回傳給使用者
    event.reply(replyMsg).then(function(data) {
      // 當訊息成功回傳後的處理
    }).catch(function(error) {
      // 當訊息回傳失敗後的處理
    });
  }

});

app.listen(process.env.PORT || 80, function() {
  console.log('LineBot is running.');
});
