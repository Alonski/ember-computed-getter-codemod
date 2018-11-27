const { getParser } = require("codemod-cli").jscodeshift;

// Taken from https://astexplorer.net/#/gist/b209a80226d4724feb909d88d25ba18e/15f040b98fa77a3027a6e73e977a8ceac7b3283c
module.exports = function transformer(file, api) {
    const j = getParser(api);

    return j(file.source)
        .find(j.CallExpression, { callee: { name: "computed" } })
        .forEach(path => {
            const pathIdx = path.node.arguments.length - 1; // Always last argument
            if (path.node.arguments[pathIdx].type === "ObjectExpression") {
                return;
            }

            const getter = path.node.arguments[pathIdx];
            //in case of < Ember 1.12, check for old school arguments checking to determine if get or set
            //
            // if(arguments.length > 1){
            //     //setter
            // }else{
            //     //getter
            // }
            if (
                getter.body.body.length === 1 &&
                getter.body.body[0].type === "IfStatement" &&
                getter.body.body[0].test.type === "BinaryExpression"
            ) {
                const firstLine = getter.body.body[0];
                const test = firstLine.test;

                const left = test.left;
                const right = test.right;
                const operator = test.operator;

                const consequent = firstLine.consequent;
                const alternate = firstLine.alternate;

                if (left.object.name === "arguments" && left.property.name === "length" && right.value === 1) {
                    if (operator === ">") {
                        path.node.arguments[0] = j.objectExpression([
                            j.objectMethod(
                                "method",
                                j.identifier("get"),
                                getter.params.length > 1 ? [getter.params[0]] : getter.params,
                                alternate
                            ),
                            j.objectMethod("method", j.identifier("set"), getter.params, consequent)
                        ]);
                        return;
                    } else {
                        return;
                    }
                }
            }
            path.node.arguments[pathIdx] = j.objectExpression([
                j.objectMethod("method", j.identifier("get"), getter.params, getter.body)
            ]);
        })
        .toSource();
};
