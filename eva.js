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
            return this.eval(exp[1]) + this.eval(exp[2]);
        }
        if (exp[0] === '-'){
            return this.eval(exp[1]) - this.eval(exp[2]);
        }
        if (exp[0] === '*'){
            return this.eval(exp[1]) * this.eval(exp[2]);
        }
        if (exp[0] === 'var'){
            const[_, name, value] = exp;
            return env.define(name, value);
        }
        if(isVar(exp)){
            return env.lookup(exp);
        }
        throw `Unimplemented ${JSON.stringify(exp)}`
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
const eva = new Eva();

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
//y = undefined
assert.strictEqual(eva.eval('y'), 3);

console.log('eva sees no evil');
