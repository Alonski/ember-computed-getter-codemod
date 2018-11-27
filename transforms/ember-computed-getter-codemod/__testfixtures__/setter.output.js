Ember.Object.extend({
    dateFilterEnd: computed({
        get(key) {
            return key;
        },

        set(key, value) {
            key = value;
        }
    })
});
