# stream-lnd-htlcs

Streams temporary channel failures to telegram bot using Telegram API (Grammy), stream data comes from HTLC stream gRPC API from LND. Tempoary Channel Failure data is parsed and forwarded to Telegram, all other failures are written in JSON format to failurelogs.json file.

## Telegram Bot

Get your new telegram bot and API key from BotFather (https://t.me/botfather)

## Installation

You'll need an active `lnd`, version 0.9.0+ (https://github.com/lightningnetwork/lnd), with routerrpc built in and Node.js 16.

Get Node.js 16

```
curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
```

Install Node.js 16

```
sudo apt-get install -y nodejs
```

Get the Repository in the directory where you want to install

```
git clone https://github.com/niteshbalusu11/stream-lnd-htlc-bot.git
```

Change Directory

```
cd stream-lnd-htlc-bot
```

You will need to create a `.env.local` file that stores some information to run the bot. <br></br>
Run `cat .env` which gives which shows a sample of how `.env.local` needs to look like. <br></br>
Replace with your information for `LND_DIR` and `API_KEY`.<br></br>
`SOCKET` will most likely be the same for most people, in some cases it could be your `tlsextradomain:rpclisten{port}` which can be obtained from your `lnd.conf` file (the file you set your Node's Alias). An example would be `127.66.99.99:10009`
<br></br>
For Umbrel users, your socket might be `umbrel.local:10009`
<br></br>

For `ENVIRONMENT` you can replace with `testnet` `regtest` `signet` etc if you want to test in lower environments. `network` also supports `litecoin` if you're into that shit.

```
# Create the file
touch .env.local

#Edit the file and copy and edit values you got from ".env" above and replace what is necessary.
nano .env.local

#Save and exit
ctrl + x
y
```

## Run

To test if it's working run the following command

```
npm start
```

then run `/start` on telegram and your bot will respond that its ready. If it's working, then `ctrl + c` and you can run any background process manager like tmux, nohup or systemd.
<br></br>
For Tmux:

```
# Install tmux if you don't have it.
sudo apt install tmux

# New tmux session
tmux new -s AnySessionNameOfYourChoice

# Run the command again
npm start

/start on the telegram bot, the bot should respond.


# Detach from tmux session
ctrl+b
d
(leave control when hitting d)
```

## Kill the bot with tmux

```
tmux ls (this gives list of your active sessions)
tmux kill-ses -t YourSessionName
```

## Setting up systemd service

Create a new service file, e.g. streamtgbot.service:

```
sudo nano /etc/systemd/system/streamtgbot.service
```

Insert the following (edit `WorkingDir`, `User`, `Group` to fit your setup):

```
# Stream-LND-HTLC-Bot: systemd unit
# /etc/systemd/system/streamtgbot.service

[Unit]
Description=Stream-LND-HTLC-Bot daemon

[Service]
# replace with your path to stream-lnd-htlc-bot
WorkingDirectory=/your/path/to/stream-lnd-htlc-bot

# find out your installation path of "npm" by typing command "which npm" in console and replace it below (e.g. /usr/bin/npm or /home/user/.npm-global/bin/npm)
ExecStart=/path/to/npm start

# replace user. check with terminal command "whoami", e.g. for umbrel:
# User=umbrel
# Group=umbrel
User=youruser
Group=youruser

Type=simple
Restart=on-failure
TimeoutSec=120
RestartSec=30

# Hardening
ProtectSystem=full
NoNewPrivileges=true
PrivateDevices=true

[Install]
WantedBy=multi-user.target
```

Save and exit (ctrl+o, ctrl+x).

Reload Systemd: `sudo systemctl daemon-reload`

Enable streamtgbot: `sudo systemctl enable streamtgbot` (to automatically start on system boot)

Start streamtgbot: `sudo systemctl start streamtgbot`

If you want to Stop streamtgbot: `sudo systemctl stop streamtgbot`

If you want to Restart streamtgbot: `sudo systemctl restart streamtgbot`

If you want to Disable streamtgbot, stop the bot first with the stop command, then: `sudo systemctl disable streamtgbot`

## Updating

```
# Stop the bot however you're running such as tmux or systemd, instructions to stop are above.

# Change directory to stream-htlc-bot
cd /path/to/stream-htlc-bot

# Pull the updates
git pull

# Start the bot again based on how you're running it and
run /start in telegram and the bot will respond that its ready to send notifications.
```
