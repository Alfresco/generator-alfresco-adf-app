# <%= projectName %>
<%= description %>

## Prerequisites

Before you start using this development framework, make sure you have installed all required software and done all the
necessary configuration, see this [page](https://github.com/Alfresco/alfresco-ng2-components/blob/master/PREREQUISITES.md).

### Building and running

1 Install dependencies

```sh
npm install
```

2 Fast build and watch for dev purposes

```sh
npm start
```

>`start` script also includes live reload and watchers for all the `.ts` files.
TypeScript watchers are also configured for `node_modules` folder within demo shell
and provide live reload for all the component libraries as well.

### i18n support
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
