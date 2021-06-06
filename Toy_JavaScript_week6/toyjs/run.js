const Evaluator = require('./evaluator.js')
const {parse, closure} = require('./parser.js')

let source = `
    a = {b: 2};
    a.b;
`

let tree = parse(source)
console.log(JSON.stringify(tree, null, '  '))
let evaluator = new Evaluator()
let result = evaluator.evaluate(tree)
console.log(result)
