const line = require('@line/bot-sdk');
const express = require('express');
const lineConfig = {
  channelAccessToken: '2cf7831a10e737ed5a961f55b554aba8',
  channelSecret: 'xPq70ID8sUOuyW4eoWYRt9Q0WpIk3VZ0ihdk28s9geYCdi6d/9dxDWPaufAvrW/GjdxSKN0Zf/f9A1YMYteFUlFrOaQ0ZFeBRpGHF1Vu7lxs5rjRdliKsOip8vdADQonaSIluZO3VChaN4RRvB5M4wdB04t89/1O/w1cDnyilFU='
};
const app = express();
app.post('/webhook', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result));
});

const client = new line.Client(lineConfig);

function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: event.message.text
  });
}

app.listen(3000);
