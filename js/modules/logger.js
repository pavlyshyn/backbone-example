define([
    'backbone'
],function(){
    var Logger = Backbone.Model.extend({
        
        append: function(msg, type) {
            if(App.config.showConsoleLogs) {
                if (type == undefined) {
                    console.log(msg);
                }
                else if (type == 'log') {
                    console.log(msg);
                }
                else if (type == 'warn') {
                    console.warn(msg);
                }
                else if (type == 'info') {
                    console.info(msg);
                }
                else if (type == 'error') {
                    console.error(msg);
                }
            }
        }
    });

    return new Logger();
});