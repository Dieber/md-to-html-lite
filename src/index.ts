// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...
import { TokenParser } from './TokenParser'
import { NodeParser } from './NodeParser'
import { HTMLParser } from './HtmlParser'

let str = `### sld

123** vhhef  **  123123 0 s**kdfjlkvd

getBlock###

**543**~~吼吼~~k1*~***~~*~~`

let str2 = `### sld
123`
let parser = new TokenParser(str2)
parser.parseToToken()
let tokens = parser.getTokens()
let nodeParser = new NodeParser(tokens)
let node = nodeParser.parseToNode()

console.dir(node)
let html = HTMLParser(node)

console.log(html)

// export default {
//   TokenParser
// }

//
