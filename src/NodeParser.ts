import { TokenParser, Token } from './TokenParser'
import { TokenTypes, NodeTypes } from './utils/types'
import { Stack } from './utils/Stack'
import { BinNode, BinTree } from './utils/Tree'
// type nodeTypes = typeof NodeTypes

// type Node = {
//   type: NodeTypes
//   data?: Object
// }

class Node {
  private type: NodeTypes
  private value?: Object
  getType() {
    return this.type
  }
  constructor(type: NodeTypes, value?: Object) {
    this.type = type
    this.value = value
  }
}

class NodeParser {
  private token: Array<Token>
  private tree: BinTree<Node>
  private stack: Stack<BinNode<Node>>
  constructor(token: Array<Token>) {
    this.token = token
    let rootNode: Node = new Node(NodeTypes.RootNode)
    this.tree = new BinTree<Node>(rootNode)
    this.stack = new Stack<BinNode<Node>>()
  }
  parseToNode() {
    this.stack.push(this.tree.getRoot())
    this.token.forEach((item: Token) => {
      if (item.getType() === TokenTypes.NewLine) {
        // 获取栈顶类型
        let nodeType = this.stack
          .getLast()
          .getData()
          .getType()
        if (nodeType === NodeTypes.Paragraph) {
          this.stack.pop()
        }
        let node = new Node(NodeTypes.Paragraph)
        let binNode = this.insertNodeToTree(this.stack.getLast(), node)
        this.stack.push(binNode)
      } else if (item.getType() === TokenTypes.Bold) {
        let node = new Node(NodeTypes.Bold, item.getValue())
        this.insertNodeToTree(this.stack.getLast(), node)
      } else if (item.getType() === TokenTypes.Delete) {
        let node = new Node(NodeTypes.Delete, item.getValue())
        this.insertNodeToTree(this.stack.getLast(), node)
      } else if (item.getType() === TokenTypes.NormalString) {
        let node = new Node(NodeTypes.Span, item.getValue())
        this.insertNodeToTree(this.stack.getLast(), node)
      } else if (item.getType() === TokenTypes.Head) {
        let node = new Node(NodeTypes.Head, item.getValue())
        this.insertNodeToTree(this.stack.getLast(), node)
      }
    })
    console.log(this.tree)
  }
  insertNodeToTree(stackTopNode: BinNode<Node>, virtualNode: Node) {
    let node: BinNode<Node>
    let lc = stackTopNode.getLeft()
    if (!lc) {
      // 若无左孩子，则放到左孩子上
      node = this.tree.insertAsLeft(stackTopNode, virtualNode)
    } else {
      // 若无右孩子，则放到右孩子最后一个上
      stackTopNode = lc
      while (stackTopNode.getRight()) {
        stackTopNode = stackTopNode.getRight() as BinNode<Node>
      }
      node = this.tree.insertAsRight(stackTopNode, virtualNode)
    }
    return node
  }
}

export { NodeParser }
