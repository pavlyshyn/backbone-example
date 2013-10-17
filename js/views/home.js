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
                logger.append('home View initialize');
                
            }
        });
        
        
        new View();
    };
});