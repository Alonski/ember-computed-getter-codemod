Ember.Object.extend({
    dateFilterEnd: computed({
        get() {
            return "myComputed";
        },

        set() {
            key = arguments[1];
        }
    })
});
