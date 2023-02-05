const assert = require ('assert')

console.log('Eva Rising...')

class Eva{
    eval(exp){
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
        throw `Unimplemented ${JSON.stringify(exp)}`
    }
}

function isNumber(exp){
    return typeof exp === 'number';
}
function isString(exp){
    return typeof exp === 'string' && exp[0] === '"' && exp.slice(-1) === '"';
}

const eva = new Eva();

assert.strictEqual(eva.eval(3), 3);
assert.strictEqual(eva.eval('"n0ko"'), "n0ko");
assert.strictEqual(eva.eval(['+', 1, 2]), 3);
//(6-3) = 3
assert.strictEqual(eva.eval(['-', 6, 3]), 3);
//(1*3) = 3
assert.strictEqual(eva.eval(['*', 1, 3]), 3);
//(1+1) + 1 = 3
assert.strictEqual(eva.eval(['+', ['+', 1, 1], 1]), 3);

console.log('eva sees no evil');
