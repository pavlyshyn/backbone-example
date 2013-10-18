define(
[
    'modules/logger',
    'views/main',
    'text!/js/templates/home.html'
],
function(logger, mainView, template) {
    'use strict';
    
    return function() {
        
        var View = mainView.extend({
            initialize: function () {
                logger.append('home View initialize');
                View.__super__.initialize.call(this);
                
                this.context.content = _.template(template, {})
            }
        });
        
        var view = new View();
        view.render();
    };
});