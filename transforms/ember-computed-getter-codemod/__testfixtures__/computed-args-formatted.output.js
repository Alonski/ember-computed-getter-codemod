Ember.Object.extend({
    myComputed: computed("computifyThis", {
        get() {
            return "myComputed";
        }
    })
});
