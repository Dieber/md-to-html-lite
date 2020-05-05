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

class NodeParser {
  private token: Array<Token>
  private tree: BinTree<MarkDownNode>
  private stack: Stack<BinNode<MarkDownNode>>
  constructor(token: Array<Token>) {
    this.token = token
    let rootNode: MarkDownNode = new MarkDownNode(NodeTypes.RootNode)
    this.tree = new BinTree<MarkDownNode>(rootNode)
    this.stack = new Stack<BinNode<MarkDownNode>>()
  }
  parseToNode() {
    this.stack.push(this.tree.getRoot())
    this.token.forEach((item: Token) => {
      if (item.getType() === TokenTypes.NewLine) {
        // 获取栈顶类型
        let nodeType = this.stack
          .getTop()
          .getData()
          .getType()
        if (nodeType === NodeTypes.Paragraph) {
          this.stack.pop()
        }
        let node = new MarkDownNode(NodeTypes.Paragraph)
        let binNode = this.insertNodeToTree(this.stack.getTop(), node)
        this.stack.push(binNode)
      } else if (item.getType() === TokenTypes.Bold) {
        let node = new MarkDownNode(NodeTypes.Bold, item.getValue())
        this.insertNodeToTree(this.stack.getTop(), node)
      } else if (item.getType() === TokenTypes.Delete) {
        let node = new MarkDownNode(NodeTypes.Delete, item.getValue())
        this.insertNodeToTree(this.stack.getTop(), node)
      } else if (item.getType() === TokenTypes.NormalString) {
        let node = new MarkDownNode(NodeTypes.Span, item.getValue())
        this.insertNodeToTree(this.stack.getTop(), node)
      } else if (item.getType() === TokenTypes.Head) {
        let node = new MarkDownNode(NodeTypes.Head, item.getValue())
        this.insertNodeToTree(this.stack.getTop(), node)
      }
    })
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

export { NodeParser, MarkDownNode }
