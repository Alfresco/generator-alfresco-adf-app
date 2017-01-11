# <%= projectName %>
<%= description %>

## Prerequisites

Before you start using this development framework, make sure you have installed all required software and done all the
necessary configuration, see this [page](https://github.com/Alfresco/alfresco-ng2-components/blob/master/PREREQUISITES.md).

## Building and Running

Install dependencies

```sh
npm install
```

### Development build

```sh
npm start
```

This command compiles and starts the project in watch mode.
Browser will automatically reload upon changes.
Upon start you can navigate to `http://localhost:3000` with your preferred browser.

#### Important notes

This script is recommended for development environment and not suited for headless servers and network access.

### Production build

```sh
npm run build
npm run start:dist
```

This command builds broject in `production` mode.
All output is placed to `dist` folder and can be served your preferred web server.
You should need no additional files outside the `dist` folder.

#### Important notes

By default demo application is configured to use [wsrv](https://www.npmjs.com/package/wsrv) tool (lightweight web server)
to serve production build output. It will be running at `0.0.0.0` address with port `3000` and allow you accessing your application
via network. However you can use any web server of your choice in production.

## i18n support

To support a new language you need to create your language file (.json) and add it to `i18n/` folder.

```json
{
        "username" : "Username",
        "input-required-message": "Required",
        "input-min-message": "Your username needs to be at least 4 characters.",
        "login-button": "Login"
}
```

Directory structure:
```
.
├── custom-translation/
│   ├──i18n/
│      ├──
│      ├── en.json
│      ├── it.json
│      └── fr.json
```
 <% if (authorEmail) { %>
## History

For detailed changelog, check [Releases](https://github.com/<%= githubAccount %>/<%= projectName %>/releases).

## Contributors

[Contributors](https://github.com/<%= githubAccount %>/<%= projectName %>/graphs/contributors)
  <% } %>
