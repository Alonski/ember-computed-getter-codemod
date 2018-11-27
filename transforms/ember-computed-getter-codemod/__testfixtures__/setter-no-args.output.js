Ember.Object.extend({
    dateFilterEnd: computed({
        get() {
            return "myComputed";
        },

        set() {
            arguments[0] = arguments[1];
        }
    })
});
