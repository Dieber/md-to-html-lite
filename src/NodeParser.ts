import { TokenParser, Token } from './TokenParser'
import { tokenTypes } from './utils/types'

class NodeParser {
  private token: Array<Token>
  constructor(token: Array<Token>) {
    this.token = token
  }
  parseToNode() {
    this.token.forEach((item: Token) => {
      if (item.getType() === tokenTypes.NewLine) {
      }
    })
  }
}

export { NodeParser }
