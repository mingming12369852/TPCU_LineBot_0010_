const linebot = require('linebot');
const express = require('express');

const bot = linebot({
    channelId: '1653984063',
    channelSecret: '2cf7831a10e737ed5a961f55b554aba8',
    channelAccessToken: 'xPq70ID8sUOuyW4eoWYRt9Q0WpIk3VZ0ihdk28s9geYCdi6d/9dxDWPaufAvrW/GjdxSKN0Zf/f9A1YMYteFUlFrOaQ0ZFeBRpGHF1Vu7lxs5rjRdliKsOip8vdADQonaSIluZO3VChaN4RRvB5M4wdB04t89/1O/w1cDnyilFU='
});


//這一段的程式是專門處理當有人傳送文字訊息給LineBot時，我們的處理回應
bot.on('message', function(event) {
    if (event.message.type = 'text') {
        let msg = event.message.text;
        //收到文字訊息時，直接把收到的訊息傳回去，這裏是 echo，就是你問什麼就回答什麼，簡單的對話
        event.reply(msg).then(function(data) {
            // 傳送訊息成功時，可在此寫程式碼
            console.log(msg);
        }).catch(function(error) {
            // 傳送訊息失敗時，可在此寫程式碼
            console.log('錯誤產生，錯誤碼：'+error);
        });
    }
});

const app = express();

// bot.parser() 是 LINE Bot 的傳過來的資料，以及 JSON 解析
const linebotParser = bot.parser();
app.post('/webhook', linebotParser);

const server = app.listen(process.env.PORT || 80, function() {
    let port = server.address().port;
    console.log('目前的port是', port);
});
