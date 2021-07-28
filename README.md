
# Twitch Chat

Twitch chat is an extention that integrates a twitch channel chat of your choice in to your code editor.

![](https://i.gyazo.com/07c6fa0478cf31f2d0a92a75e7dd790b.gif)

## Features

<details>
	<summary><b>Twitch chat in tab</b></summary>
	<ol>
		<li>Draggable & Responsive</li>
		<li>Emotes & Links</li>
	</ol>
	<img src="https://i.gyazo.com/b37c04b5398ffae277e4010cb09d3b25.png">
</details>

<details>
	<summary><b>Chat notifications <i>-when chat tab is not focused</i></b></summary>
	<ol>
		<li>Popup new chats (Optional)</li>
		<li>Title indicator</li>
	</ol>
	<img src="https://i.gyazo.com/d268441028f9f78fa288eba87ace0b52.png">
</details>


## Getting Started

 1. Navigate to `Settings > Extensions > Twitch Chat`
 2. Add `channel`, `username` and your `oauth token`
 3. Reload/Restart VS Code
 4. Open the command menu; `[ctrl]`+`[shift]`+`[p]` (or whatever you have bound it to)
 5. Type `Twitch: Open chat`

## Extension Settings

This extension contributes the following settings:

| Setting         | Description                        | Type                        |
|-----------------|------------------------------------|-----------------------------|
| twitch.fontSize | Sets font size of chat window	   | String ~ `14px`             |
| twitch.alert    | Enable/disable chat popup alerts   | Boolean ~ `false`           |
| twitch.channel  | Twitch channel you want to chat in | String ~ `bobross`          |
| twitch.username | Your twitch username               | String ~ `mytwitchname`     |
| twitch.oauth    | Your twitch oauth token            | String ~ `oauth:TOKEN_KEY`  |

 You can generate your oauth token at [n0.no/twitch](https://n0.no/twitch/) or [create one yourself](https://dev.twitch.tv/docs/authentication/getting-tokens-oauth/).

## Known Issues
🦗🦗🦗

## Contributing
Feel free to submit issues and pull requests over at the [github repository](https://github.com/kamerat/vs-code-twitch-chat).
