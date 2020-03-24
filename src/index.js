const line = require('@line/bot-sdk');
const express = require('express');
const lineConfig = {
  channelAccessToken: '2cf7831a10e737ed5a961f55b554aba8',
  channelSecret: 'xPq70ID8sUOuyW4eoWYRt9Q0WpIk3VZ0ihdk28s9geYCdi6d/9dxDWPaufAvrW/GjdxSKN0Zf/f9A1YMYteFUlFrOaQ0ZFeBRpGHF1Vu7lxs5rjRdliKsOip8vdADQonaSIluZO3VChaN4RRvB5M4wdB04t89/1O/w1cDnyilFU='
};
const client = new line.Client(lineConfig);
const app = express();
app.listen(3000, function() {
  console.log('App now running on port', this.address().port);
});
