Ember.Object.extend({
    dateFilterEnd: computed(function() {
        if (arguments.length > 1) {
            key = arguments[1];
        } else {
            return "myComputed";
        }
    })
});
