module.exports = {
    "/auth/admin/realms/myrealm": {
        "target": "http://0.0.0.0:8080",
        "secure": false,
        "pathRewrite": {
            "^/auth/admin/realms/myrealm": ""
        },
        "changeOrigin": true,
        "logLevel": "debug"
    },
    "/auth/realms/myrealm": {
        "target": "http://0.0.0.0:8080",
        "secure": false,
        "pathRewrite": {
            "^/auth/realms/myrealm": ""
        },
        "changeOrigin": true,
        "logLevel": "debug"
    },
    "/": {
        "target": "http://0.0.0.0:8080",
        "secure": false,
        "changeOrigin": true,
        "logLevel": "debug"
    }
}
