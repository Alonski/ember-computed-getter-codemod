"use strict";

const { runTransformTest } = require("codemod-cli");

runTransformTest({
    type: "jscodeshift",
    name: "ember-computed-getter-codemod"
});
