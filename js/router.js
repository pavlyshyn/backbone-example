define([
    'backbone',
    'modules/logger'
],
function(Backbone, logger) {
    'use strict';
    
    var AppRouter = Backbone.Router.extend({
        routes:{
            '': 'home',
            'todo': 'todo',
            '*actions':'page404'
        },
        
        home: function (params) {
            logger.append('route: home');
            this.loadView('home', params);
        },
        
        todo: function (params) {
            logger.append('route: todo');
            this.loadModule('notes', params);
        },
        
        page404:function (params) {
            logger.append('Page "'+params+'" Not found', 'error');
            this.loadView('page404', params);
        },
        
        loadView: function(view, params) {
            require(['views/'+view], function(view) {
                view(params);
            });
        },
                
        loadModule: function(module, params) {
            require(['modules/'+module+'/index'], function(module) {
                module(params);
            });
        }
    });

    var initialize = function(){
        logger.append('router initialize');
        
        App.router = new AppRouter();
        Backbone.history.start({
            pushState: true
        });
    };
    
    return {
        initialize: initialize
    };
});

