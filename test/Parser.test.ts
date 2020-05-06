import { TokenParser } from '../src/TokenParser'
import * as fs from 'fs'
import * as path from 'path'

describe('Test if Token is genarated exactly', () => {
  it('token', () => {
    let str = fs.readFileSync(path.resolve(__dirname, './markdowns/normal.md'), 'utf-8')
    let parser = new TokenParser(str)
    parser.parseToToken()
    expect(true).toBe(true)
  })
})

// let str = `### sld

// 123** vhhef  **  123123 0 s**kdfjlkvd

// getBlock###

// **543**~~吼吼~~k1*~***~~*~~`

// let str2 = `### sld

// 123

// ## 567##`
// let parser = new TokenParser(str)
// parser.parseToToken()
// let tokens = parser.getTokens()
// let nodeParser = new MarkDownNodeParser(tokens)
// let node = nodeParser.parseToNode()

// // nodeParser.visit()

// // console.dir(node)
// let html = HTMLParser(node)

// console.log(html)

// export default {
//   TokenParser
// }

//
