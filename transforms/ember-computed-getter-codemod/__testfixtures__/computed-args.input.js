Ember.Object.extend({
    myComputed: computed("computifyThis", function() {
        return "myComputed";
    })
});
