## Github search application

With this React application you can search for Github users, and view information about user profile and respositories. It communicates with Github API. While developing this application I tried to keep in mind good programming principles like DRY, Single Responsibility principle etc. 
For design I used Bootstrap library, for loading animation I used React Promise Tracker and loading spinner example I found online, and also I used Redux library for state managing.

### Installing

For this application you have to install Node.js.
After that you can run `npm install` and all required run time and development packages will be downloaded to node_modules directory.

### Running

To start application, in command prompt run `npm run start` command. Application will be build and application will be opened in browser automatically.

### Deploying

To build application for production environment, you need to run command `npm run build`. 
Application will be build, and you can find files in `dist` directory.
If you want to test it locally, you can run `npm run serve`, and application will be served locally from `dist`.
