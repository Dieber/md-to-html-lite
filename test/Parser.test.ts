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
