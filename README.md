# Qlik Sense visualization template

## Installation

Download and unzip template to appropriate folder.

Make sure you have NodeJS and NPM installed.

Hit

```sh

 npm install

 ```
 to install all required dependencies.

 ## Configuration

Specify appropriate *--env.url* and *--env.deploy* parameters in the *package.json* scripts.
*env.url* - is a link to appropriate qlik sense app sheet with the extension.
*env.deploy* - allows to specify which folder should be used to deploy build assets. It allows to have source files outside of qlik sense extensions folder. if you omit *env.deploy* build folder will be used to deploy assets.

## Usage

#### Development
Hit
```
npm run dev
```
for development.

Open specified **env.url** (see Configuration section). Edit source files (*src* folder). Hot rebuilds starts in response to file modifications.

#### Production build

Hit
```
npm run build
```
for production.

## Maintainers

[alner](https://github.com/alner)

## License

MIT

TODO

    "dev": "node_modules/.bin/webpack-dev-server --env.development --env.url=http://localhost:4848/sense/app/fullappname/sheet/sheetname --env.deploy=C:/Users/nerush/Documents/Qlik/Sense/Extensions/TestTemplate --progress",
    "build": "webpack -p --env.production --progress --colors"
