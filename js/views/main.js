define(
[
    'backbone',
    'modules/logger',
    'text!/js/templates/main.html'
],
function(Backbone, logger, mainTemplate) {
    'use strict';
    
    var MainView = Backbone.View.extend({
        el: $("body"),
        template: '',
        events:{
            'click #home-page':  "goToHome",
            'click #error-page': "goToError"
        },
        initialize: function () {
            logger.append('Main View initialize');
            
            this.context = {
                content: ''
            };
        },
        
        render: function () {
            logger.append('Main View render');
            $(this.el).html(_.template(mainTemplate, this.context));
        },
        
        goToHome: function() {
            App.router.navigate("", {trigger: true});
        },
        
        goToError: function() {
            App.router.navigate("error", {trigger: true});
        }
    });
    
    return MainView;
})