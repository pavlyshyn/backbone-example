define(
[
    'modules/logger',
    'views/main',
    'text!/js/templates/404.html'
],
function(logger, mainView, template) {
    'use strict';
    
    return function(params) {
        
        var View = mainView.extend({
            initialize: function () {
                logger.append('404 View initialize');
                logger.append(params);
                View.__super__.initialize.call(this);
                
                this.context.content = _.template(template, {})
            }
        });
        
        var view = new View();
        view.render();
    };
});