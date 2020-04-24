import { isNewLine } from './utils/is'

// 词法分析阶段
class Token {
  private type: string
  private value: string | Object
  constructor(type: string, value: string | Object) {
    this.type = type
    this.value = value
  }
}

class TokenParser {
  private _input: string
  private _pos: number
  private _tokens: Array<Token>
  constructor(input: string) {
    this._input = input
    this._pos = 0
    this._tokens = []
  }
  getTokens() {
    return this._tokens
  }
  parseToToken() {
    // console.log(123)
    this._input = '\n' + this._input
    console.log(this._input.length)
    while (this._pos < this._input.length) {
      let i = this.getChar()
      if (isNewLine(this.getChar())) {
        this.getNewLineToken()
      }
      if (this.getChar() === '*') {
        this.getBoldToken()
      } else {
        this.getNormalStringToken()
      }
      // break
      // switch(this.getChar()) {
      //   case '#':
      //     this.getHeaderToken()
      //   case '*':
      //     this.getBoldToken()
      //   case '~':
      //     this.getDeleteToken()
      //   case '\r':
      //     this.getNewLineToken()
      //   default :
      //     this.getNormalStringToken()
      // }
    }
  }
  getChar(offset = 0) {
    return this._input[this._pos + offset]
  }
  getHeadToken() {
    // /\r?\n/.test(this.getChar())
    let count = 1
    while (this.getChar(count) === '#') {
      count++
    }
    // 若#后面有空格则被判断为标题，否则则不是
    if (this.getChar(count) === ' ') {
      // 消耗 #和空格
      while (this.getChar() === '#' || this.getChar() === ' ') {
        this.consume()
      }
      let str = ''
      // 获取本行所有文字
      while (!isNewLine(this.getChar()) && !this.isEnd()) {
        str += this.getChar()
        this.consume()
      }
      // 推入token
      this._tokens.push(
        new Token('Head', {
          level: count,
          string: str
        })
      )
    }
  }
  isEnd() {
    return this._pos >= this._input.length
  }
  isLast() {
    return this._pos >= this._input.length - 1
  }
  getBoldToken() {
    let str = ''
    console.log(this.getChar(1))
    if (this.getChar(1) === '*') {
      console.log(90)
      let count = 2
      console.log(123)
      while (true) {
        if (this.isLast()) {
          return
        }
        if (isNewLine(this.getChar(count))) {
          return
        }
        if (this.getChar(count) === '*' && this.getChar(count + 1) === '*') {
          break
        }
        str += this.getChar(count)
        ++count
      }
      if (!str.length) {
        return
      }
      this._tokens.push(new Token('Bold', str))
      this.consume(count + 2)
    }
  }
  getNewLineToken() {
    // 合并多个NewLine
    do {
      // debugger
      this.consume()
    } while (isNewLine(this.getChar()))
    this._tokens.push(new Token('NewLine', 'NewLine'))

    if (this.getChar() === '#') {
      this.getHeadToken()
    }
  }
  getNormalStringToken() {}
  getLineToken() {}
  consume(pos = 1) {
    this._pos += pos
  }
}

export default TokenParser
