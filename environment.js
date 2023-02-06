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
    lookup(name){
        //this.record[name] = name;
        if (!this.record.hasOwnProperty(name)){
            throw new ReferenceError(`Variable ${name} is not defined.`)
        }
        return this.record[name];
    }
    //assign (self-evaluate)
}

module.exports = Environment;
