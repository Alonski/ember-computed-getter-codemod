Ember.Object.extend({
    dateFilterEnd: computed(function(key, value) {
        if (arguments.length > 1) {
            // This sets so don't format
            key = value;
        } else {
            return "myComputed";
        }
    })
});
