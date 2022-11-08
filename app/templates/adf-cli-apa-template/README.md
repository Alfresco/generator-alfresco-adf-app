# ADF/APS Application with Angular CLI

Minimal ready-to-use Angular CLI project template pre-configured with ADF components.

## Quick start

```sh
npm install
npm start
```

## Supported ADF component libraries

This project has all the existing ADF component libraries already pre-configured.

The main focus of the project is:

- ADF integration and setup
- Basic demonstration of working components

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Proxy settings

The template provides certain proxy settings to allow running web application locally without CORS setup.
You can find details in the `proxy.conf.js` file.

List of URLs being proxied:

- `/` -> `http://0.0.0.0:9999`
- `/auth/realms/myrealm` -> `http://0.0.0.0:9999/YOUR_OAUTH_HOST`
- `/auth/admin/realms/myrealm` -> `http://0.0.0.0:9999/
YOUR_IDENTITY_HOST`

## Code scaffolding

Run `ng generate component component-name -m app.module` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
