//Identifier不仅要能读，也要能写入（在等号左边时）
//因此需要Reference类型
class Reference {
    constructor(object, property) {
        this.object = object
        this.property = property
    }
    set(value) {
        this.object[this.property] = value
    }
    get() {
        return this.object[this.property]
    }
}

class Realm {
    constructor() {
        this.global = new Map()
        this.Object = new Map()
        this.Object.call = function() {

        }
        this.Object_prototype = new Map()
    }
}

class ExecutionRecord {
    constructor() {
        this.thisValue
        this.variables = new Map()
        this.outer = null
    }
}

class ExecutionContext {
    constructor(realm, lexicalEnvironment, variableEnvironment) {
        variableEnvironment = variableEnvironment || lexicalEnvironment
        this.lexicalEnvironment = lexicalEnvironment
        this.variableEnvironment = variableEnvironment
        this.realm = realm
    }
}

module.exports = {
    ExecutionContext, Reference, ExecutionRecord, Realm
}
