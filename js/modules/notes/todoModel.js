define(
[
    'backbone',
    'modules/logger'
],
function(Backbone, logger) {
    'use strict';
    
    var todoModel = Backbone.Model.extend({
        url : '/index.json',
        initialize: function () {
            logger.append('Todo Model initialize');
            
        },
        
        validate: function(attributes) {
            logger.append('Todo Model validate');
            
            if(attributes._id === '') {
                logger.append('value _id can not be empty', 'error');
                return 1;
            }
            if(attributes.title === '') {
                logger.append('value title can not be empty', 'error');
                return 2;
            }
        }
    });
    
    return todoModel;
});