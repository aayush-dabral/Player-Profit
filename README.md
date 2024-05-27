# ClubstoHire.com

Find the best tee times and package rates on ClubstoHire where you book online with Zest.Golf

# Introduction

TODO: This document provides step-by-step instructions for manage UI the ClubstoHire web application. Please follow these instructions carefully to ensure a successful build project

## Prerequisites

First and foremost, you'll need to have npm installed on the computer that you're working on. Without that, there's no way to install the prerequisite libraries and projects. You can download Node and npm for your project at https://nodejs.org, then perform the following steps:

1. Find the appropriate installer package for your computer and operating system for Node and NPM at https://nodejs.org and follow the instructions provided by the installer.
2. Install an appropriate code editor or Interactive Development Environment (IDE). I've had the best experiences with Visual Studio Code, so that gets my personal recommendation, but you can use anything you're comfortable with!
3. Once you've installed Node ...

### Install Node JS

Refer to https://nodejs.org/en/ to install nodejs

### Install create-react-app

Install create-react-app npm package globally. This will help to easily run the project and also build the source files easily. Use the following command to install create-react-app

```bash
npm install -g create-react-app
```

## Cloning and Running the Application in local

Clone the project into local

Install all the npm packages. Go into the project folder and type the following command to install all npm packages

### Copy and Paste

```bash
# clone the repo
$ git clone https://github.com/pncESA/WLTTBWeb.git  WLTTBWeb

# go into app's directory
$ cd WLTTBWeb

# install app's dependencies
$ yarn
```

In order to run the application Type the following command

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app)

see also:
[CRA docs](https://create-react-app.dev/docs/getting-started)

### Basic usage

```bash
# dev server with hot reload at http://localhost:3000
$ yarn start
```

Navigate to [http://localhost:3000](http://localhost:3000). The app will automatically reload if you change any of the source files.

The Application Runs on **localhost:3000**

### Build

Run `build` to build the project. The build artifacts will be stored in the `build/` directory.

```bash
# build with minification
$ yarn build

```

## What's included

Within the download you'll find the following directories and files, logically grouping common assets and providing both compiled and minified variations. You'll see something like this:

```
React#v18.2.0
├── public/              #static files
│   └── index.html       #html template
│
├── src/                 #project root
│   ├── assets/            #assets - js icons object
│   ├── components/      #components source
|   │   ├── index.js       #index file
|   │   └── ...
│   ├── pages/      #pages source - template layout
|   │   ├── index.js     #index file
|   │   └── ...
|   |
│   ├── services/        #services source
|   │   └── api.js         #api implement
│   ├── redux/           #template state example
|   │   ├── reducers.js    #all reducers implement
|   │   ├── store.js    #all store implement
|   │   └── ...
|   |
|   |
│   ├── utiles/           #utiles files
|   │   ├── index.js
|   │   └── ...
|   |
│   ├── App.js
│   ├── App.test.js
│   ├── index.js
│   ├── routes.js         #routes config
│   └── ...
│
├── .gitignore            #ignoring important files.
├── craco.config.js       #craco.config files.
├── tailwind.conig.js     #implement colors and screen resolution.
│
└── package.json
```

## Staging Application URL

### https://demo-wlttb-web.customer.zest.golf/

This URL has the application deployed in Staging Server

# The Git Flow

<https://github.com/pncESA/WLTTBWeb>

A way to think about Git and Github.

- Open up a text editor like VSCode.
- Type "Hello World".
- Change the contents of that file again. Add in your own text. Save it again.
  - You can certainly redo the work (e.g. replacing all the text with "Hello World" and saving again) but the original work is gone otherwise.
- Git saves.

        git add .
        git commit -m "Related Commits(s): ticket_number, ticket_description"

- This is great because now we can roll back to old versions of files without having to retype. Aka "source control".

- Now one could "clone" that repository on another computer and not just get the latest code but the complete revision history on another computer.

- Used to Fetch all banch from a remote repository

        git fetch

- Check All Branch

        git brnach

- Create a branch as normal.

        git branch ticket_number

- Switch between branch

        git checkout branch_name

- Remove some change

        git stash

- Updated Branch

       git push origin  development

## ⚙️ Documentation

The documentation for the Tailwind Components is hosted at our website [Tailwind for React](https://tailwindcss.com/)

### :film_strip: How to setup Tailwind component in react. Video tutorial available [here](https://www.youtube.com/watch?v=lCxcTsOHrjo)

## Versioning

See [the Releases section of our project](https://react.dev/community/versioning-policy#stable-releases) for changelogs for each release version in React .

## ✨ Community

Get updates on TailwindUI's development and chat with the project maintainers and community members.

- Follow [@tailwindcss on Twitter](https://twitter.com/tailwindcss?lang=en).
- Read and subscribe to [Tailwindcss Blog](https://tailwindcss.com/docs/installation).
- [React](https://react.dev/community) - Come chat with the React community including the react js team.
- [React Blog](https://react.dev/blog) - A curated list of awesome things related to React Blog.
- [Tailwind](https://tailwindcss.com/blog) - Come chat with the React community including the tailwiend css team.
- [Material UI](https://mui.com/material-ui/getting-started/) - The Material UI with docs.

## 📚 Learn more

- [Resource center](https://react.dev/reference/react) - React resource center.
- [Tailwind documentation](https://tailwindcss.com/docs/editor-setup) - Official Tailwinds documentation.
- [Material UI documentation](https://mui.com/material-ui/getting-started/usage/) - Official Tailwinds documentation.
- [React tutorials](https://react.dev/learn) - List of tutorials made by the react team and the community.
- [React blog](https://react.dev/blog) - Official Strapi blog containing articles made by the React team and the community.
- [Changelog](https://react.dev/community/versioning-policy) - Find out about the React Component updates, new features and general improvements.

Feel free to check out the [React GitHub repository](https://github.com/facebook/react/releases). Your feedback and contributions are welcome!

## Reporting security issues and bugs

Security issues and bugs should be reported privately, via email, **support@zest.golf** You should receive a response within 24 hours. If for some reason you do not, please follow up via email to ensure we received your original message. Further information,

## License

Copyright 2023 ClubstoHire. All rights reserved.
