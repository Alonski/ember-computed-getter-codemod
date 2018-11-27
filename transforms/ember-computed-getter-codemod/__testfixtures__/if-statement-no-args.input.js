Ember.Object.extend({
    myComputed: computed("computifyThis", function() {
        if (window.get(this, "myComputed") === "myComputed") {
            return "myComputed";
        } else {
            return "myComputed";
        }
    })
});
