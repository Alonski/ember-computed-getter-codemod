Ember.Object.extend({
    dateFilterEnd: computed(function() {
        if (arguments.length > 1) {
            arguments[0] = arguments[1];
        } else {
            return "myComputed";
        }
    })
});
