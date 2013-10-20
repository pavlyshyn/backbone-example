define(
[
    'jquery',
    'modules/logger',
    'text!/js/templates/todo/item.html'
],
function(jQuery, logger, itemTemplate) {
    'use strict';
    
    return Backbone.View.extend({
        tagName:  'li',
        template: _.template(itemTemplate),
        events: {
            'click .todo-remove': 'clear'
        },
        
        initialize: function () {
            this.listenTo(this.model, 'destroy', this.remove);
        },
        
        render: function () {
            this.$el.html(this.template(this.model.attributes));
            return this;
        },
        
        clear: function () {
            this.model.destroy();
        }
    });
});