// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...
import TokenParser from './TokenParser'

let parser = new TokenParser(`

** vhhef * ** **543***

####  Foo`)
console.log(123)

parser.parseToToken()
console.log(parser.getTokens())

// export default {
//   TokenParser
// }
