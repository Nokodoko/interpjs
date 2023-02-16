class Environment{
    constructor(record = {}, parent = null){
        this.parent = parent;
        this.record = record;
    }
    //define (set)
    define(name, value){
        this.record[name] = value;
        return value;
    }
    //lookup 
    lookup(name){
       return this.resolve(name).record[name];
    }

    //identifier resolution
    resolve(name){
        if(this.record.hasOwnProperty(name)){
                return this;
            }
        if (this.parent == null){
        throw new ReferenceError(`Variable ${name} is not defined.`);
        }
        return this.parent.resolve(name);
    }
    //assign (self-evaluate)
}
