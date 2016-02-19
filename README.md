# ircbot

A small irclog and bot which you can run to log irc messages in a channel, and shows a client with all of the messages and a possibility to connect online.

# requirements
Requires nodejs and a running Couchdb server (`sudo apt-get install couchdb`).

Add your DB to couch:
```bash
curl -X PUT http://127.0.0.1:5984/irclog
```

Or if your prefer something else make sure you have a environment variable called
`COUCHLOCATION`

# install
```bash
  git clone https://github.com/fritzvd/irclog.git
  cd irclog
  cp config.json.example config.json
  vim config.json # whatever just edit the file
  npm install
  npm start
```
