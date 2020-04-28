import { isNewLine } from './utils/is'
import { TokenTypes } from './utils/types'
// 词法分析阶段
class Token {
  private type: TokenTypes
  private value?: string | Object
  constructor(type: TokenTypes, value?: string | Object) {
    this.type = type
    this.value = value
  }
  getType() {
    return this.type
  }
  getValue() {
    return this.value
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
    this._input = '\n' + this._input
    while (this._pos < this._input.length) {
      if (isNewLine(this.getChar())) {
        this.getNewLineToken()
      } else if (this.getChar() === '~') {
        this.getDeleteToken()
      } else if (this.getChar() === '*') {
        this.getBoldToken()
      } else if (this.isEnd()) {
        break
      } else {
        this.getNormalStringToken()
      }
    }
  }
  getChar(offset = 0) {
    return this._input[this._pos + offset]
  }
  getHeadToken() {
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
        new Token(TokenTypes.Head, {
          level: count,
          string: str
        })
      )
    }
  }
  isEnd(offset = 0) {
    return this._pos >= this._input.length
  }
  isLast() {
    return this._pos >= this._input.length - 1
  }
  getBoldToken() {
    this.getDoubleMarkToken('*', TokenTypes.Bold)
  }
  getDeleteToken() {
    this.getDoubleMarkToken('~', TokenTypes.Delete)
  }
  getDoubleMarkToken(mark: string, tokenType: TokenTypes) {
    if (this.getChar(1) !== mark) {
      this.getNormalStringToken(0, 1)
      return
    }
    let str = ''
    let count = 2
    while (true) {
      if (this._pos + count === this._input.length) {
        this.getNormalStringToken(0, count)
        return
      }
      if (isNewLine(this.getChar(count))) {
        this.getNormalStringToken(0, count)
        return
      }
      if (this.getChar(count) === mark && this.getChar(count + 1) === mark) {
        break
      }
      str += this.getChar(count)
      count++
    }
    this._tokens.push(new Token(tokenType, str))
    this.consume(count + 2)
    let i = this.getChar()
  }
  getNewLineToken() {
    // 合并多个NewLine
    do {
      this.consume()
    } while (isNewLine(this.getChar()))
    this._tokens.push(new Token(TokenTypes.NewLine))

    if (this.getChar() === '#') {
      this.getHeadToken()
    }
  }
  getNormalStringToken(directStart?: number, directEnd?: number) {
    if (directStart !== undefined && directEnd !== undefined) {
      let str = ''
      let length = directEnd - directStart
      while (length--) {
        str += this.getChar()
        this.consume()
      }
      this._tokens.push(new Token(TokenTypes.NormalString, str))
      return
    }
    let str = ''
    let count = 0
    while (
      !isNewLine(this.getChar()) &&
      this.getChar() !== '~' &&
      this.getChar() !== '*' &&
      !this.isEnd()
    ) {
      str += this.getChar()
      this.consume()
    }
    this._tokens.push(new Token(TokenTypes.NormalString, str))
  }
  consume(pos = 1) {
    // console.log(this.getChar())
    this._pos += pos
  }
}

export { Token, TokenParser }
