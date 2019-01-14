
# Twitch Chat

Twitch chat is an extention that integrates a twitch channel chat of your choice in to your code editor.

![](https://i.gyazo.com/efd5f97f96c312faa808fd718705436a.gif)

## Features

 **Twitch chat in tab:**
 1. Draggable & responsive

![](https://i.gyazo.com/b37c04b5398ffae277e4010cb09d3b25.png)

**Chat notifications** *-When chat tab is not focused*
 1. Popup new chats (Optional)
 2. Title indicator

![](https://i.gyazo.com/d268441028f9f78fa288eba87ace0b52.png)

## Requirements

 1. Twitch account
 2. Twitch oauth token

## How to use

 1. Navigate to `Settings > Extensions > Twitch Chat`
 2. Add `channel`, `username` and your `oauth token`*
 3. Reload/Restart VS Code
 4. Open the command menu; `[ctrl]`+`[shift]`+`[p]` (or whatever you have bound it to)
 5. Type `Twitch: Open chat`
 6. Tap your shoulder(or mine *\*wink\**) and say *"Good job!"*

>\* You can generate a token at [n0.no/twitch](https://n0.no/twitch/) or [create one yourself](https://dev.twitch.tv/docs/authentication/getting-tokens-oauth/).

## Extension Settings

This extension contributes the following settings:

* `twitch.alert`: enable/disable chat popup alerts
* `twitch.channel`: Twitch channel you want to chat in 
* `twitch.username`: Your twitch username
* `twitch.oauth`: your twitch oauth token. `oauth:<YOUR TOKEN>`. 
	* You can generate one at [n0.no/twitch](https://n0.no/twitch/) or [create one yourself](https://dev.twitch.tv/docs/authentication/getting-tokens-oauth/).

## Known Issues
Somtimes the chat does not show the user's correct color.(It is returned as `null` from api)🤷‍♂️

## Contributing
Feel free to submit issues and pull requests over at the [github repository](https://github.com/BlitZz96/vs-code-twitch-chat).

## Release Notes

### 0.0.3

Add "How to use" section in README & fail-checks if none provided

### 0.0.2

Fix wrong marketplace color

### 0.0.1

Initial release of Twitch Chat 🎉🎉