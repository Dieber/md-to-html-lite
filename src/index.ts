// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...
import TokenParser from './TokenParser'

let str = `

### sld
123** vhhef  **  123123 0 s**kdfjlkvd

**543**~~吼吼~~k1*`

let parser = new TokenParser(str)
console.log(str)

parser.parseToToken()
console.log(parser.getTokens())

// export default {
//   TokenParser
// }
