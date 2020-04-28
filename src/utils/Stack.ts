class Stack<T> {
  private elems: Array<T> = []
  push(elem: T) {
    this.elems.push(elem)
  }
  pop() {
    return this.elems.pop()
  }
  getLast() {
    return this.elems[this.elems.length - 1]
  }
}

export { Stack }
