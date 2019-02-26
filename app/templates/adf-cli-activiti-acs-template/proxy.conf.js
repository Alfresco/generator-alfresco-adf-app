module.exports = {
    "/auth/admin/realms/myrealm": {
        "target": "http://localhost:8080",
        "secure": false,
        "pathRewrite": {
            "^/auth/admin/realms/myrealm": ""
        },
        "changeOrigin": true,
        "logLevel": "debug"
    },
    "/auth/realms/myrealm": {
        "target": "http://localhost:8080",
        "secure": false,
        "pathRewrite": {
            "^/auth/realms/myrealm": ""
        },
        "changeOrigin": true,
        "logLevel": "debug"
    },
    "/": {
        "target": "http://localhost:8080",
        "secure": false,
        "changeOrigin": true,
        "logLevel": "debug"
    },
    "/alfresco": {
        "target": "http://localhost:8080",
        "secure": false,
        "changeOrigin": true
      }
}
