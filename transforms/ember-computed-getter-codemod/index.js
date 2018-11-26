const { getParser } = require("codemod-cli").jscodeshift;

// Taken from https://astexplorer.net/#/gist/b209a80226d4724feb909d88d25ba18e/352207fd48d1e34829eb72564dd2632ff218572c
module.exports = function transformer(file, api) {
    const j = getParser(api);

    return j(file.source)
        .find(j.CallExpression, { callee: { name: "computed" } })
        .forEach(path => {
            if (path.node.arguments[0].type === "ObjectExpression") {
                return;
            }

            const getter = path.node.arguments[0];
            const firstLine = getter.body.body[0];
            const test = firstLine.test;
            if (
                firstLine.type === "IfStatement" &&
                test.operator === ">" &&
                test.left.object.name === "arguments" &&
                test.left.property.name === "length" &&
                test.right.value === 1
            ) {
                return;
            }
            path.node.arguments[0] = j.objectExpression([
                j.objectMethod("method", j.identifier("get"), getter.params, getter.body)
            ]);
        })
        .toSource();
};
