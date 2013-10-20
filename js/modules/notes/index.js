define(
[
    'jquery',
    'modules/logger',
    'views/main',
    'modules/notes/note',
    'modules/notes/todoCollection',
    'text!/js/templates/todo/main.html'
],
function(jQuery, logger, mainView, oneNoteView, todoCollection, mainTemplate) {
    'use strict';
    
    return function() {
        var View = mainView.extend({
            events:_.extend({
                'keypress #new-todo'    : 'createNew'
            }, mainView.prototype.events),
            
            initialize: function () {
                logger.append('notes View initialize', 'info');
                View.__super__.initialize.call(this);
                
                this.context.content = jQuery(mainTemplate).html();
                
                this.on('render', function() {
                    this.listenTo(todoCollection, 'add', this.addOne);
                    this.listenTo(todoCollection, 'reset', this.addAll);
                    
                    todoCollection.fetch({reset: true});
                });
            },
            
            addAll: function () {
                this.$('#todo-list').html('');
		todoCollection.each(this.addOne, this);
            },
            
            addOne: function(newNote) {
                var view = new oneNoteView({ model: newNote });
		$('#todo-list').prepend(view.render().el);
            },
            
            newAttributes: function () {
                return {
                    _id         : todoCollection.nextOrder(),
                    title       : jQuery('#new-todo').val(),
                    completed   : false
                };
            },
            
            createNew: function(e) {
                if (e.which === 13) {
                    logger.append('todo View createNew', 'info');
                    todoCollection.create(this.newAttributes());
                    jQuery('#new-todo').val('');
                }
            }
        });
        
        var view = new View();			
        view.render();
    };
});