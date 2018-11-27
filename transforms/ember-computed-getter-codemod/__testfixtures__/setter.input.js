Ember.Object.extend({
    dateFilterEnd: computed(function(key, value) {
        if (arguments.length > 1) {
            key = value;
        } else {
            return key;
        }
    })
});
