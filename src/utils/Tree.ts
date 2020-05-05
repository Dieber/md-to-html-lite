class BinNode<T> {
  private data: T
  private left: null | BinNode<T>
  private right: null | BinNode<T>
  constructor(data: T) {
    this.data = data
    this.left = null
    this.right = null
  }
  getLeft() {
    return this.left
  }
  getRight() {
    return this.right
  }
  getData() {
    return this.data
  }
  insertAsLeft(data: T) {
    return (this.left = new BinNode<T>(data))
  }
  insertAsRight(data: T) {
    return (this.right = new BinNode<T>(data))
  }
}

class BinTree<T> {
  private root: BinNode<T>
  public count: number = 1
  constructor(data: T) {
    this.root = new BinNode<T>(data)
  }
  getRoot() {
    return this.root
  }
  insertAsLeft(node: BinNode<T>, data: T) {
    this.count++
    let lnode = node.insertAsLeft(data)
    return lnode
  }
  insertAsRight(node: BinNode<T>, data: T) {
    this.count++
    let rNode = node.insertAsRight(data)
    return rNode
  }
}

export { BinNode, BinTree }
