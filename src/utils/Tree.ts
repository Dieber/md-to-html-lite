class BinNode<T> {
  private data?: T
  private left?: null | BinNode<T>
  private right?: null | BinNode<T>
  constructor(data?: T) {
    this.data = data
    this.left = null
    this.right = null
  }
  insertAsLeft(data: T) {
    let leftChild = new BinNode<T>()
    leftChild.data = data
    this.left = leftChild
  }
  insertAsRight(data: T) {
    let leftChild = new BinNode<T>()
    leftChild.data = data
    this.left = leftChild
  }
}

class BinTree<T> {
  private root: BinNode<T>
  constructor(data: T) {
    this.root = new BinNode<T>(data)
  }
  getRoot() {
    return this.root
  }
  insertAsLeft(node: BinNode<T>, data: T) {
    node.insertAsLeft(data)
  }
  insertAsRight(node: BinNode<T>, data: T) {
    node.insertAsRight(data)
  }
}

type Stack<T> = Array<T>
