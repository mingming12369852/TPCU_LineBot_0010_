bot.on('memberJoined', function (event) {
  event.source.profile().then(function (profile) {
    if(event.source.type === 'group') {
      event.reply('memberJoined: Welcome to the group.');
    }
    if(event.source.type === 'room') {
      event.reply('memberJoined: Welcome to the room.');
    }
  });
});
