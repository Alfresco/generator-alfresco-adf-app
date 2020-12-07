/* eslint-disable camelcase */
/**
 * Contains the default app deployment settings
 * @class config.test.config
 */

const HOST_SSO = process.env.HOST_SSO;
const USERNAME = process.env.USERNAME_ADF;
const PASSWORD = process.env.PASSWORD_ADF;

const appConfig = {
  log: 'ERROR',
  ecmHost: 'https://' + HOST_SSO,
  bpmHost: 'https://' + HOST_SSO,
  identityHost: `https://${HOST_SSO}/auth/admin/realms/alfresco`,
  provider: 'ALL',
  authType: 'OAUTH',
  oauth2: {
    host: `https://${HOST_SSO}/auth/realms/alfresco`,
    clientId: 'alfresco',
    scope: 'openid',
    secret: '',
    implicitFlow: true,
    silentLogin: true,
    redirectUri: '/',
    redirectUriLogout: '/logout',
    redirectSilentIframeUri: `https://${HOST_SSO}/assets/silent-refresh.html`,
    publicUrls: [
      '**/logout',
      '**/preview/s/*',
      '**/settings'
    ]
  }
};

module.exports = {

  appConfig: appConfig,

  log: true,

  main: {
    rootPath: __dirname
  },

  users: {
    admin: {
      username: USERNAME,
      password: PASSWORD
    }
  },

  timeouts: {
    visible_timeout: 200000,
    no_visible_timeout: 200000,
    index_search: 250000
  }
};
