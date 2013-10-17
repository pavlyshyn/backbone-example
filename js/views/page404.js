define(
[
    'backbone',
    'modules/logger'
],
function(Backbone, logger) {
    'use strict';
    
    return function(params){
        
        var View = Backbone.View.extend({
            initialize: function () {
                logger.append('404 View initialize');
                logger.append(params);
                
            }
        });
        
        
        new View();
    };
});