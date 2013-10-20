define(
[
    'backbone',
    'modules/logger',
    'LocalStorage',
    'modules/notes/todoModel'
],
function(Backbone, logger, localStorage, todoModel) {
    'use strict';
    
    var todosCollection = Backbone.Collection.extend({
        model: todoModel,
        localStorage: new localStorage("todo-list"),
        
        nextOrder: function () {
            if (!this.models.length) {
                return 1;
            }
            return this.models.length+1;
        }
    });
    
    return new todosCollection();
});