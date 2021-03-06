require.config({
    baseUrl: '/js',
    paths:{
        "jquery"    : "/js/libraries/jquery",
        "underscore": "/js/libraries/underscore",
        "backbone"  : "/js/libraries/backbone",
        "LocalStorage" : "/js/modules/backbone.localStorage",
        "text"      : "/js/libraries/require/text"
    },

    shim: {
        backbone: {
            deps    : ['jquery','underscore'],
            exports : 'Backbone'
        },
        'underscore': {
            exports: '_'
        }
    }
});
require(['app'], function (App) {
    App.initialize();
});