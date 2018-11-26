const { getParser } = require("codemod-cli").jscodeshift;

module.exports = function transformer(file, api) {
    const j = getParser(api);

    return j(file.source)
        .find(j.CallExpression, { callee: { name: "computed" } })
        .forEach(path => {
            if (path.node.arguments[0].type === "ObjectExpression") {
                return;
            }

            const getter = path.node.arguments[0];
            path.node.arguments[0] = j.objectExpression([
                j.objectMethod("method", j.identifier("get"), getter.params, getter.body)
            ]);
        })
        .toSource();
};
