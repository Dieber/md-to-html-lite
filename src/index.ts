// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...
import { TokenParser } from './TokenParser'
import { NodeParser } from './NodeParser'

let str = `

### sld

123** vhhef  **  123123 0 s**kdfjlkvd

getBlock###

**543**~~吼吼~~k1*~***~~*~~`

let parser = new TokenParser(str)
console.log(str)

parser.parseToToken()
let tokens = parser.getTokens()

let nodeParser = new NodeParser(tokens)
nodeParser.parseToNode()
// export default {
//   TokenParser
// }

//
