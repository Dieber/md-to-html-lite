// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...
import { TokenParser } from './TokenParser'
import { MarkDownNodeParser } from './MarkDownNodeParser'
import { HTMLParser } from './HtmlParser'

let str = `### sld

123** vhhef  **  123123 0 s**kdfjlkvd

getBlock###

**543**~~吼吼~~k1*~***~~*~~`

let str2 = `### sld

123

## 567##`
let parser = new TokenParser(str)
parser.parseToToken()
let tokens = parser.getTokens()
let nodeParser = new MarkDownNodeParser(tokens)
let node = nodeParser.parseToNode()

// nodeParser.visit()

// console.dir(node)
let html = HTMLParser(node)

console.log(html)

// export default {
//   TokenParser
// }

//
