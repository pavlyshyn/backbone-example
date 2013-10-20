define(
[
    'backbone',
    'modules/logger',
    'text!/js/templates/main.html'
],
function(Backbone, logger, mainTemplate) {
    'use strict';
    
    var MainView = Backbone.View.extend({
        el: jQuery("body"),
        template: '',
        events:{
            'click #home-link':  "openHome",
            'click #todo-link': "openTodo"
        },
        initialize: function () {
            logger.append('Main View initialize');
            
            logger.append(2, 'info');
            
            this.context = {
                content: ''
            };
        },
        
        render: function () {
            logger.append('Main View render');
            logger.append(3, 'info');
            $(this.el).html(_.template(mainTemplate, this.context));
            
            this.trigger('render');
        },
        
        openHome: function() {
            App.router.navigate("", {trigger: true});
        },
        
        openTodo: function() {
            App.router.navigate("todo", {trigger: true});
        }
    });
    
    return MainView;
});