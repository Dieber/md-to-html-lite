// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...
import { TokenParser } from './TokenParser'
import { MarkDownNodeParser } from './MarkDownNodeParser'
import { HTMLParser } from './HtmlParser'

let str = `

### sld

123** vhhef  **  123123 0 s**kdfjlkvd

getBlock###

**543**~~吼吼~~k1*~***~~*~~`

let str2 = `

### sld

123`

let tokenParser = new TokenParser(str2)
tokenParser.parseToToken()
let tokens = tokenParser.getTokens()

let nodeParser = new MarkDownNodeParser(tokens)
let tree = nodeParser.parseToNode()

HTMLParser(tree)

// export default {
//   TokenParser
// }

//
