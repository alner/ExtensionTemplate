# Qlik Sense visualization template

![Usage](https://github.com/alner/ExtensionTemplate/blob/master/doc/usage.gif?raw=true)

## Installation

Download and unzip template to appropriate folder.

Make sure you have NodeJS and NPM installed.

Hit

```sh

 npm install

 ```
 to install all required dependencies.

 ## Configuration

Package.json scripts:

```
"scripts": {
     "dev": "node_modules/.bin/webpack-dev-server --env.development --env.url=http://localhost:4848/sense/app/C%3A%5CUsers%5Cnerush%5CDocuments%5CQlik%5CSense%5CApps%5CExtTest.qvf/sheet/dd660e1a-6fc7-4a58-9f48-26a3c066d66a/state/edit --env.build_output=C:/Users/nerush/Documents/Qlik/Sense/Extensions/TestTemplate --progress",
    "build": "webpack -p --env.production --progress --colors",
    "deploy": "webpack -p --env.production --env.deploy_command=deploy.bat --progress --colors"
}
```

Specify appropriate *--env.url* and *--env.build_output* parameters in the *package.json* scripts.  
  *env.url* - is a link to appropriate qlik sense application sheet with the embedded extension.
  *env.build_output* - optional parameter. It defines which folder should be used as a build output. By default the *build* folder is used.
  *env.production* - it defines production build.  
  *env.deploy_command* - can be used for production builds only (see *env.production* parameter). You can specify any command to deploy your build assets. See deploy.bat demo shell script.

## Usage

#### Development
Hit
```
npm run dev
```
for development.

Source entry point is *index.js* file.

Open specified **env.url** (see Configuration section). Edit component.js file (*src* folder). Hot rebuilds starts in response to file modifications. See paint.js for more details.

#### Production build

Hit
```
npm run build
```
for production build.

## Maintainers

[Alexander Nerush](https://github.com/alner)

## License

MIT
