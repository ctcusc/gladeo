# Gladeo Mobile App 
<img src = "./assets/images/gladeo_logo.png" width="100px"/>

## Getting Started
*(Note for MacOS users: avoid Homebrew when possible because it may mess up some globally installed node modules we will be using. Curl works fine for most things)*

1. Install the latest version of [`Node.js`](https://nodejs.org/en/download/)
2. Install [`Yarn`](https://yarnpkg.com/en/docs/install#). 
3. Install Expo CLI  
    `npm install -g expo-cli`

4. Download iOS Simulator  

    **Mac:** Download XCode and make sure iOS Simulator gets installed (if not installed by default `xcode-select --install`) 

    **Windows:** (optional Mac): Install Expo Client App on your phone. You will be able to scan a QR code and view the app (w/ auto reloading during development). 

    *Note: If you have an iOS simulator installed already through Android Studio or something similar, you are welcome to use that*  

5. Clone the repo and cd into it
6. Run `yarn install` to install all dependencies for the project

7. Run `yarn start`  
This should open up in http://localhost:19002/  
This is the web interface for Expo which is a packaging service that will allow our compiled React Native code to run either on the Expo Client App or through the iOS simulator (without needing to open Xcode)
- If using iOS Simulator, press "Run on iOS Simulator" on the left
- If using Expo Client App, open app and scan barcode from web interface

## IDE / Development Env.
I recommend using VS Code and I recommend installing a few essential plugins

**ESLint**: Go to extensions and install this, then edit the User Settings file with these settings

        "editor.formatOnSave": true,
        "eslint.autoFixOnSave": true,
        "[javascript]": {
            "editor.tabSize": 2
        },
        "files.trimTrailingWhitespace": true,
        "files.insertFinalNewline": true,

Other recommended extensions/plugins:
- Auto Close Tag
- Color Highlighting


## Database
Because our project's back-end is relatively lighweight, we will be using **MongoDB** and connecting it with our React Native app through **MongoDB Stitch**. If you don't already have a MongoDB account, please create one. I will be adding you all to the DB shortly.





