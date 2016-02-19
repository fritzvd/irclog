var irc = require('irc');
var server = require('./server/server');
var pouch = require('pouchdb');


var dbLocation = (process.env.COUCHLOCATION || 'http://localhost:5984/irclog');

var db = new pouch();

var config = {
    channels: ['#nens'],
    server: 'irc.freenode.net',
    botName: 'nens-bot'
}

var bot = new irc.Client(config.server, config.botName, {
    channels: config.channels
});


var app = server.start();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var bots = {};
var names = [];

var logout = function (id) {
    bots[id].bot.disconnect();
    delete bots[id];
};

io.on('connection', function (socket) {
    console.log('user connected', socket.id);
    socket.on('login', function (msg) {
      console.log(msg)
        var name = msg.name.match(/(\w+)/)[0]
        var newBot = new irc.Client(config.server, name, {
            channels: config.channels
        });
        bots[socket.id] = {
            bot: newBot
        };
        newBot.addListener('registered', function (ircMessage) {
            // show it in client
            socket.emit('joined', {
                name: msg.name,
                newNick: ircMessage.args[0],
                names: names
            });
        });
    });

    socket.on('send message', function (msg) {
        bots[socket.id].bot.say(config.channels[0], msg.message);
    });

    socket.on('logout', function (msg) {
        if (bots.hasOwnProperty(socket.id)) {
            logout(socket.id);
        }
    });

    socket.on('disconnect', function () {
        if (bots.hasOwnProperty(socket.id)) {
            logout(socket.id);
        }
        console.log('user diconnected')
    });
});

http.listen(3000, function () {
     console.log('listening on :3000');
});

bot.addListener('message', function (from, to, text, message) {
    db.put({
        text: text,
        _id: new Date() - 0 + from,
	timestamp: new Date(),
        sentfrom: from,
        sentto: to
    }).then(function(resp) {
    io.emit('new message',
          {
            text: text,
            name: from,
            timestamp: new Date(),
            names: names
    });
console.log(resp)
   }).catch(function(error){
	console.error(error);
});
});

bot.addListener('join', function (channels, nick, message) {
    // show it in client
    console.log('irc bot joined: '+ nick);
});

bot.addListener('names', function (channel, nicks) {
    names = nicks;
});
