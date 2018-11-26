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
            //in case of < Ember 1.12, check for old school arguments checking to determine if get or set
            //
            // if(arguments.length > 1){
            //     //setter
            // }else{
            //     //getter
            // }
            if (getter.body.body.length === 1 &&
                getter.body.body[0].type === "IfStatement" &&
                getter.body.body[0].test.type === 'BinaryExpression'){
        
                let left = getter.body.body[0].test.left;
                let right = getter.body.body[0].test.right;
                let operator = getter.body.body[0].test.operator;
                
                let consequent = getter.body.body[0].consequent;
                let alternate = getter.body.body[0].alternate;
                
                if(left.object.name === "arguments" &&
                   left.property.name === "length" &&
                   right.value === 1){
                    if(operator === '>'){
                        path.node.arguments[0] = j.objectExpression([
                            j.objectMethod("method", j.identifier("get"), getter.params.length > 1 ? [getter.params[0]] : getter.params, alternate),
                            j.objectMethod("method", j.identifier("set"), getter.params, consequent)
                        ]);
                        return;
                    }else{
                        return;
                    }
                }
                
            }
            path.node.arguments[0] = j.objectExpression([
                j.objectMethod("method", j.identifier("get"), getter.params, getter.body)
            ]);
        })
        .toSource();
};
