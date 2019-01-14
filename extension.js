//TODO: oauth auto added to settings: https://stackoverflow.com/questions/49467421/updating-vs-code-user-settings-via-an-extension
//TODO: add emoticons: https://www.npmjs.com/package/twitch-emoticons
//TODO: Add user actions (ban, timeout, etc)
//TODO: Add viewer counter?

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

const TwitchBot = require('twitch-bot')

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

let messages = [{ 'markup': '<p>Welcome to the chat room!</p>' }]

// for (let index = 0; index < 100; index++) {
// 	messages.push({
// 		'markup': `
// 		<div class="message">
// 			<p><span style="color:#8a2be2;">the_blitzz</span>: Hello, this is a message</p>
// 		</div>
// 	` })
// }

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	const config = vscode.workspace.getConfiguration("twitch");
	const channel = config.channel
	const username = config.username
	const oauth = config.oauth
	let panel = undefined
	let Bot = undefined
	let unread = 0
	
	if (oauth.length === 0) {
		return vscode.window.showErrorMessage('Twitch Chat: Please provide oauth token in settings');
	}
	if (username.length === 0) {
		return vscode.window.showErrorMessage('Twitch Chat: Please provide your twitch username in settings');
	}
	if (channel.length === 0) {
		return vscode.window.showErrorMessage('Twitch Chat: Please provide twitch channel in settings');
	}
	
	let disposable = vscode.commands.registerCommand('twitch.open', function () {
		const columnToShowIn = vscode.window.activeTextEditor
			? vscode.window.activeTextEditor.viewColumn
			: undefined;


		//Instead of creating another panel on command, reveal tab
		if (panel !== undefined) {
			panel.reveal(columnToShowIn);
		} else {
			panel = vscode.window.createWebviewPanel(
				'twitchChat',
				'Twitch chat',
				columnToShowIn,
				{ 
					enableScripts: true
				}
			)

			// Init panel DOM 
			panel.webview.html = getWebviewContent(messages.map(m => m.markup).join(''));

			Bot = new TwitchBot({
				username,
				oauth,
				channels: [channel]
			})
		}

		Bot.on('join', () => {
			console.log('Successfully connected to twitch chat.')

			Bot.on('message', chatter => {
				// Add notification to title if not active
				if (!panel.visible) {
					unread++
					panel.title = `(${unread}) Twitch chat`;
					
					// Display popup on new messages
					if (config.alert) {
						vscode.window.showInformationMessage(`${chatter.display_name}: ${chatter.message}`)
					}
				}

				pushMessage(chatter, panel)

				if (chatter.message === '!test') {
					Bot.say('Command executed! PogChamp')
				}
			})
		})

		Bot.on('error', err => {
			console.log(err)
			vscode.window.showErrorMessage(err.message);
		})
		
		Bot.on('close', () => {
			console.log("closed twitch chat connection");
		})

		// Handle messages from the webview
		panel.webview.onDidReceiveMessage(message => {
			switch (message.command) {
					case 'submit-message':
						Bot.say(message.text, undefined, err => {
							console.log(err);
							vscode.window.showErrorMessage(err.message);
						})
						//Add our own message to cache because it does not trigger bot@message event
						pushMessage({'message': message.text, 'display_name': username}, panel)
						return;
				}
			},
			undefined,
			context.subscriptions
		);

		panel.onDidChangeViewState(() => {
			//Make scroll-bar goto bottom - so we are always at last message
			panel.webview.postMessage({ command: 'resize' });

			if (panel.visible) {
				// Populate chat with cached messages
				panel.webview.html = getWebviewContent(messages.map(m => m.markup).join(''));

				//Remove notifications from title when user activates panel
				setTimeout(() => {
					panel.title = "Twitch chat";
				}, 500);
			}
		});

		panel.onDidDispose(() => {
				// When the panel is closed, cancel any future updates to the webview content
				panel = undefined; //Reset panel
				Bot.close()
			},
			null,
			context.subscriptions
		);
	});

	context.subscriptions.push(disposable);
}

function getWebviewContent(messages) {
	return `<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Cat Coding</title>
			<style>
				body, html {
					height: 100%;
					overflow: hidden;
				}
				.chat {
					height: calc(100% - 105px);
					overflow-x: hidden;
					overflow-y: auto;
				}
				.chat .message {
					padding: 5px 0;
				}
				.chat .message p{
					margin: 0;
				}

				.chat-input {
					justify-content: center;
					display: flex;
					margin-top: 20px;
				}
				.chat-input textarea {
					width: 100%;
					border-radius: 4px;
					background: #fff;
					border: 1px solid #dad8de;
					color: #433f4a;
					font-family: inherit;
					line-height: 1.5;
					outline: 0;
					padding: 10px 10px;
					resize: none;
					transition: box-shadow .1s ease-in,border .1s ease-in;
				}
				.chat-input textarea:focus {
					border-color: #7d5bbe;
					box-shadow: 0 0 6px -2px #7d5bbe;
				}
			</style>
		</head>
		<body>
			<div id="chat" class="chat">${messages}</div>

			<div class="chat-input">
				<textarea id="chatInput" autofocus placeholder="Send a message" onkeypress="onTextareaKeypress(event);"></textarea>
			</div>

			<script>
				const vscode = acquireVsCodeApi();
				let chat = document.getElementById('chat')

				// Auto-scroll to bottom
				chat.scrollTop = chat.scrollHeight;

				// Handle the message inside the webview
				window.addEventListener('message', event => {
					const message = event.data;
					switch (message.command) {
						case 'message':
							chat.insertAdjacentHTML('beforeend', message.markup);
							chat.scrollTop = chat.scrollHeight;
							break;
						case 'resize':
							chat.scrollTop = chat.scrollHeight;
							break;
					}
				});

				// Handle textarea input
				function onTextareaKeypress(event) {
					let value = event.target.value
					if (event.keyCode == 13) {
						if (!event.shiftKey && value.trim().length > 0) {
							vscode.postMessage({
								command: 'submit-message',
								text: value
							})
							event.target.value = ''
						} else if (event.shiftKey) {
							return true
						}
						event.preventDefault()
					}
				}
			</script>
		</body>
		</html>`;
}

function pushMessage(msg, panel) {
	//Create new key that contains our markup for displaying the message.
	msg.markup = `
		<div class="message">
			<p><span style="color:${msg.color ? msg.color : ''}">${msg.display_name}</span>: ${msg.message}</p>
		</div>
	`
	//Push to our list of already cached session messages 
	messages.push(msg)

	panel.webview.postMessage({ command: 'message', markup: msg.markup });
}


exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}

module.exports = {
	activate,
	deactivate
}
