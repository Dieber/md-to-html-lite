import { TokenParser, Token } from './TokenParser'
import { TokenTypes, NodeTypes } from './utils/types'
import { Stack } from './utils/Stack'
import { BinNode, BinTree } from './utils/Tree'
// type nodeTypes = typeof NodeTypes

// type MarkDownNode = {
//   type: NodeTypes
//   data?: valueObj
// }

type valueObj = {
  [key: string]: any
}

class MarkDownNode {
  private type: NodeTypes
  private value?: string | valueObj
  getType() {
    return this.type
  }
  getValue() {
    return this.value
  }
  constructor(type: NodeTypes, value?: string | valueObj) {
    this.type = type
    this.value = value
  }
}

class MarkDownNodeParser {
  private tokens: Array<Token>
  private tree: BinTree<MarkDownNode>
  private stack: Stack<BinNode<MarkDownNode>>
  private curr: number
  constructor(tokens: Array<Token>) {
    this.tokens = tokens
    let rootNode: MarkDownNode = new MarkDownNode(NodeTypes.RootNode)
    this.tree = new BinTree<MarkDownNode>(rootNode)
    this.curr = 0
    this.stack = new Stack<BinNode<MarkDownNode>>()
  }
  consume() {
    this.curr++
  }
  getCurrentToken(offset?: number) {
    let curr = offset ? this.curr + offset : this.curr
    return this.tokens[curr]
  }
  visit() {
    let stack = new Stack<BinNode<MarkDownNode> | null>()
    stack.push(this.tree.getRoot())
    while (!stack.isEmpty()) {
      let top = stack.pop()
      if (top!.getLeft()) {
        stack.push(top!.getLeft())
      }
      if (top!.getRight()) {
        // console.log('right', top!.getRight()!.getData())
      }
    }
  }
  // visitMid() {
  //   let stack = new Stack<BinNode<MarkDownNode> | null>()
  //   stack.push(this.tree.getRoot())
  //   while (!stack.isEmpty()) {
  //     let top = stack.pop()
  //     if (top!.getLeft()) {
  //       stack.push(top!.getLeft())
  //     } else {
  //       stack.pus
  //     }
  //     if (top!.getRight()) {
  //       console.log('right', top!.getRight()!.getData())
  //     }
  //   }
  // }
  parseToNode() {
    this.stack.push(this.tree.getRoot())

    while (this.getCurrentToken().getType() !== TokenTypes.End) {
      let token = this.getCurrentToken()
      // console.log(this.stack.getTop().getData())
      switch (token.getType()) {
        case TokenTypes.NewLine: {
          // 若栈顶的类型为之前的段落，则替换掉之前的段落
          let stackTopType = this.stack
            .getTop()
            .getData()
            .getType()
          if (stackTopType === NodeTypes.Paragraph) {
            this.stack.pop()
          }
          // 查看后一个Value是否有是Head或其他可以合并Token为一个节点的Token
          if (this.getCurrentToken(1).getType() === TokenTypes.Head) {
            let node = new MarkDownNode(NodeTypes.Head, this.getCurrentToken(1).getValue())
            this.consume()
            this.consume()
            this.insertNodeToTree(this.stack.getTop(), node)
          } else {
            let node = new MarkDownNode(NodeTypes.Paragraph)
            let binNode = this.insertNodeToTree(this.stack.getTop(), node)
            this.stack.push(binNode) // 栈顶替换新段落
            this.consume()
          }
          break
        }
        case TokenTypes.Bold: {
          let node = new MarkDownNode(NodeTypes.Bold, token.getValue())
          this.insertNodeToTree(this.stack.getTop(), node)
          this.consume()
          break
        }
        case TokenTypes.Delete: {
          let node = new MarkDownNode(NodeTypes.Delete, token.getValue())
          this.insertNodeToTree(this.stack.getTop(), node)
          this.consume()
          break
        }
        case TokenTypes.NormalString: {
          let node = new MarkDownNode(NodeTypes.Span, token.getValue())
          this.insertNodeToTree(this.stack.getTop(), node)
          this.consume()
          break
        }
      }
    }
    return this.tree
  }
  insertNodeToTree(stackTopNode: BinNode<MarkDownNode>, virtualNode: MarkDownNode) {
    let node: BinNode<MarkDownNode>
    let lc = stackTopNode.getLeft()
    if (!lc) {
      // 若无左孩子，则放到左孩子上
      node = this.tree.insertAsLeft(stackTopNode, virtualNode)
    } else {
      // 若无右孩子，则放到右孩子最后一个上
      stackTopNode = lc
      while (stackTopNode.getRight()) {
        stackTopNode = stackTopNode.getRight() as BinNode<MarkDownNode>
      }
      node = this.tree.insertAsRight(stackTopNode, virtualNode)
    }
    return node
  }
}

export { MarkDownNodeParser, MarkDownNode }
