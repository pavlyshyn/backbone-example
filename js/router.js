define([
    'backbone',
    'modules/logger'
],
function(Backbone, logger) {
    'use strict';
    
    var AppRouter = Backbone.Router.extend({
        routes:{
            '': 'home',
            '*actions':'page404'
        },
        
        home: function (params) {
            logger.append('route: home');
            this.loadView('home', params);
        },
        
        page404:function (params) {
            logger.append('route: page404');
            this.loadView('page404', params);
        },
        
        loadView: function(module, params) {
            require(['views/'+module], function(module) {
                module(params);
            });
        }
    });

    var initialize = function(){
        logger.append('router initialize');
        
        new AppRouter;
        Backbone.history.start({
            pushState: true
        });
    };
    
    return {
        initialize: initialize
    };
});

