#!/usr/bin/env node

const program = require('commander');
require('dotenv').config({ path: process.env.ENV_FILE });
const fs = require('fs');

const API_HOST = 'https://' + process.env.HOST_SSO;

const options = {
    apiHost: {
        flags: '-a, --api-host',
        description:
        'set apiHost=API_HOST, bpmHost=API_PROCESS_HOST, ecmHost=API_CONTENT_HOST, aosHost = API_AOS_HOST if present or fall back to API_HOST in each case',
        set: (appConfig) => {
            appConfig.apiHost = API_HOST;
            appConfig.bpmHost = API_HOST;
            appConfig.ecmHost = API_HOST;
            appConfig.aosHost = API_HOST;
        }
    },
    identityHost: {
        flags: '-i, --identity-host',
        description: "set identityHost's value with IDENTITY_HOST",
        set: (appConfig) => {
            appConfig.authType = 'OAUTH';
            appConfig.identityHost = API_HOST + '/auth/admin/realms/alfresco';
        }
    },
    oauthHost: {
        flags: '-o, --oauth-host',
        description: "set oauth2.host's value with OAUTH_HOST",
        set: (appConfig) => {
          appConfig.authType = 'OAUTH';
          if (appConfig.oauth2) {
            appConfig.oauth2.host = API_HOST + '/auth/realms/alfresco';
          } else {
            appConfig.oauth2 = {
              host: API_HOST + '/auth/realms/alfresco',
              clientId: "alfresco",
              scope: "openid",
              secret: "",
              implicitFlow: true,
              silentLogin: true,
              redirectSilentIframeUri: "{protocol}//{hostname}{:port}/assets/silent-refresh.html",
              redirectUri: "/",
              redirectUriLogout: "/logout"
            };
          }
        }
    },
};

program
    .version('0.0.1')
    .requiredOption('-c, --config <path>', 'path to the app.config.json to reset its values with env vars');

Object.keys(options).forEach(option => {
    program.option(options[option].flags, options[option].description);
});

program.parse(process.argv);

fs.readFile(program.config, (err, appConfigString) => {
    if (err) {
        throw err;
    }

    const appConfig = JSON.parse(appConfigString);

    Object.keys(options).forEach(option => {
        if (program[option]) {
            options[option].set(appConfig)
        }
    });

    const appConfigReplacedJson = JSON.stringify(appConfig, null, 4);
    fs.writeFileSync(program.config, appConfigReplacedJson);
});
