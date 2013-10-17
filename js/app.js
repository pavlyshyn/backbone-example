define([
    'router',
    'modules/logger'
], function(Router, logger) {
    'use strict';
    
    window.App = {};
    window.App.config = {
        showConsoleLogs  : true
    };
    

    return {
        initialize: function(){
            logger.append('app initialize');
            
            Router.initialize();
        }
    };
});