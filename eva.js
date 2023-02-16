const assert = require ('assert')
const Environment = require ('./environment')

console.log('Eva Rising...')

class Eva{
    constructor(global = new Environment){
        this.global = global;
    }
    eval(exp, env = this.global){
        //self-evaluating expres
        if (isNumber(exp)){
            return exp;
        }
        if (isString(exp)){
            //exclude quotes in self-evaluation
            return exp.slice(1, -1);
        }
        if (exp[0] === '+'){
            return this.eval(exp[1], env) + this.eval(exp[2], env);
        }
        if (exp[0] === '-'){
            return this.eval(exp[1], env) - this.eval(exp[2], env);
        }
        if (exp[0] === '*'){
            return this.eval(exp[1], env) * this.eval(exp[2], env);
        }
        if (exp[0] === '/'){
            return this.eval(exp[1], env) / this.eval(exp[2], env);
        }
        if (exp[0] === 'var'){
            const[_, name, value] = exp;
            return env.define(name, this.eval(value));
        }
        if (exp[0] === 'begin'){
            const blockEnv = new Environment({}, env);
            return this._evalblock(exp, blockEnv);
        }
        if(isVar(exp)){
            return env.lookup(exp);
        }
        throw `Unimplemented ${JSON.stringify(exp)}`
    }

    _evalblock(block, env){
        let result;
        const [_tag, ...expressions] = block;

        expressions.forEach(exp => {
            result = this.eval(exp, env)
        });
        return result;
    }
}

function isNumber(exp){
    return typeof exp === 'number';
}
function isString(exp){
    return typeof exp === 'string' && exp[0] === '"' && exp.slice(-1) === '"';
}
function isVar(exp){
    return typeof exp === 'string' && /^[a-zA-Z][a-zA-Z0-9_]*$/.test(exp);
}
//--------------TESTS---------------
const eva = new Eva(new Environment({
    //preinstalled variables
    null: null,
    true: true,
    false: false,
    VERSION: '0.1',
}));
// int == int
assert.strictEqual(eva.eval(3), 3);
//'string' == 'string'
assert.strictEqual(eva.eval('"n0ko"'), "n0ko");
//(1+2) = 3
assert.strictEqual(eva.eval(['+', 1, 2]), 3);
//(6-3) = 3
assert.strictEqual(eva.eval(['-', 6, 3]), 3);
//(1*3) = 3
assert.strictEqual(eva.eval(['*', 1, 3]), 3);
//(1+1) + 1 = 3
assert.strictEqual(eva.eval(['+', ['+', 1, 1], 1]), 3);
//(var x = 3)
assert.strictEqual(eva.eval(['var','x', 3]), 3);
//x = 3
assert.strictEqual(eva.eval('x'), 3);
//var y declaration
assert.strictEqual(eva.eval(['var','y', 6]), 6);
//(var y = 6)
assert.strictEqual(eva.eval('y'), 6);
//built in variables
assert.strictEqual(eva.eval('VERSION'), '0.1');
//isUser = true
assert.strictEqual(eva.eval(['var','isUser', 'true']), true);

//Variable blocks:
assert.strictEqual(eva.eval(
    ['begin',
        ['var', 'x', 3],
        ['var', 'y', 2],
        ['/', ['*', 'x', 'y'], 'y'],
    ]),
    3);

//scope Blocks:
//assert.strictEqual(eva.eval(
//    ['begin',
//        ['var', 'x', 3],
//            ['begin',
//            ['var', 'x', 33],
//            'x'
//        ],
//        'x',
//    ]),
//3);
console.log('Eva sees no evil');
