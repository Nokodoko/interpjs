class Environment{
    constructor(record = {}){
        this.record = record;
    }
    //define (set)
    define(name, value){
        this.record[name] = value;
        return value;
    }
    //lookup 
    //assign (self-evaluate)
}

module.exports = Environment;
