Ember.Object.extend({
    myComputed: computed("computifyThis", {
        get() {
            if (window.get(this, "myComputed") === "myComputed") {
                return "myComputed";
            } else {
                return "myComputed";
            }
        }
    })
});
