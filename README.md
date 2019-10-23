# Gladeo Mobile App 
<img src = "./assets/images/gladeo_logo.png" width="100px"/>

## Getting Started
*(Note for MacOS users: avoid Homebrew when possible because it may mess up some globally installed node modules we will be using. Curl works fine for most things)*

1. Install the latest version of [`Node.js`](https://nodejs.org/en/download/)
2. Install [`Yarn`](https://yarnpkg.com/en/docs/install#). 
3. Install Expo CLI  
    *Installs expo module globally*  
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
- If using iOS Simulator, press "Run on iOS Simulator" on the left side of the web interface or press "i" on the command line
- If using Expo Client App, open app and scan barcode from web interface

8. All future runs only require `yarn start` unless the `yarn.lock` file has been updated in which you should run `yarn install` before starting.

## IDE / Development Env.
I recommend using VS Code and I recommend installing a few essential plugins that I will list below.


**ESLint**: In VS Code, go to extensions and install both because they are both, then edit the User Settings file with these settings

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

## Testing
- We will be using `Jest` which is an open-source JS testing framework maintained by Facebook.
- Run `yarn test` to run all Jest tests
- Our tests will be named `FileWeAreTesting.test.tsx` will be structured relative to the rest of our codebase like this:
```js
__tests__/
├─ components/
│  └─ button.test.tsx
├─ navigation/
│  └─ mainstack.test.tsx
└─ screens/
   └─ home.test.tsx
src/
├─ components/
│  └─ button.tsx
├─ navigation/
│  └─ mainstack.tsx
└─ screens/
   └─ home.tsx
```
- Checkout  HomeScreen.test.jsx for some examples

## Pushing Code + Pull Requests
- Before starting a ticket, pull master, checkout a branch w/ format `FirstInitialLastInitial-Feature` (eg: AP-LoginPage). 

- Push to that branch and when you are done, make a pull request (easy to do thru the web UI) and then tag 2 reviewers. Start off by tagging `@apetranik` and one other person. 

- Title your PR's with [Sprint-#] Description.
this will help us keep track of what sprints are what. Provide a brief summary of what you did, and if it was a front-end ticket, add a picture or GIF. 

## Essential Commands
`yarn install` - Installs dependencies (do after every pull)  

`yarn start`

`yarn test` - runs Jest tests in \__tests\__/

`yarn lint` - runs linter and tells you all errors/warnings

`yarn lint --fix` - autofixes eligable errors



## About our Stack
#### Front-End
- React Native (iOS and Android) with Expo
    - TLDR; When we run our app `yarn start`, React Native's packager (Metro) takes our code, bundles it and basically turns all of our JSX code into one JS file. Expo then grabs that and runs it inside it's own app. This allows us to use the iOS Simulator or view the app through the Expo Client app super easily without needing to open XCode or have any native code in our project. 
- TypeScript
    - TypeScript (.ts/.tsx) is all the rage right now. It is essentially JS w/ a few variations that make it safer and faster. We will be using it instead of vanilla React because Typescript offers a lot of nice features like static typing, which essential means you can catch errors during development instead of during runtime. It is also strongly typed, which means you have to explicitly give a type when you declare variables. (eg: `let name: string = "Susan"`). This will make development easier to debug and our code safer.

#### Backend
- Database: Airtables
    - After considering some of the needs of the client, we are looking into using Airtables instead of MongoDB. It is a very simple and is cross between a spreadsheet and a databse. We can use Node and Express to query it but it also has a web interface that our client can use to easy update the app. They want to be able to add new users and add new career questions to the library and this is the simpliest way. One of the other CTC teams, RiverLA, is also using it so we can support each other! 

 - Node.js + Express.js
    - We will be using Node and with it, Express as our middleware to work with our db. 
