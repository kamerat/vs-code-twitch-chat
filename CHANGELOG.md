# Change Log
All notable changes to the "twitch-chat" extension will be documented in this file.
# 0.0.9
Added
* Font size setting
  - New setting under extention's settings in vscode to let users change font size of window
* Channel-spesific twitch emotes
  - You can now see the channel's custom emotes. Note: cross channel emotes is not supported.  
Replaced
* Outdated twitchemotes api with twitch's own emotes api v/helix
# 0.0.8
Fixed
* Bug where emotes did not work 
   - 3rd party package did not have bttv 3 api
   - I 🦆'ed the emotes when sanitizing
# 0.0.7
Fixed
* Bug where twitch.open command would crash
# 0.0.6
Fixed
* Sanitized user input 🐛👮
# 0.0.5

Added
* Random color for twitch users who has not yet set a color
* BTTV and FFZ support - Credit: @ngajhede

Fixed
* Bug where chat was not showing if vscode settings `username` had capital letter
* Bump packages

# 0.0.4

Now supports Emotes & [links]()! ![](https://static-cdn.jtvnw.net/emoticons/v1/88/1.0)

# 0.0.3

Add "How to use" section in README & fail-checks if none provided

# 0.0.2

Fix wrong marketplace color

# 0.0.1

Initial release of Twitch Chat 🎉🎉