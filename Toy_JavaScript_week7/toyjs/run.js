const Evaluator = require('./evaluator.js')
const {parse, closure} = require('./parser.js')

/*
let source = `
a = 10;
while(a) {
  break;
  a = a - 1;
}
a;
`
*/

/*
let source = `
{
    let a;
    a = 1;
    {
        let a;
        a = 1;
        a = a + 1;
    }
    a;
}
`
*/

/*
let source = `
log(2, 1);
`
*/

let source = `
let x;
x = 1;
function a() {
    log(x);
}
{
    let x;
    x = 2;
    a();
}
`

/*
let source = `
    break;
`
*/
let tree = parse(source)
//console.log(JSON.stringify(tree, null, '  '))
let evaluator = new Evaluator()
let result = evaluator.evaluate(tree)
//console.log(JSON.stringify(result, null, '  '))
console.log(result.value.value)
