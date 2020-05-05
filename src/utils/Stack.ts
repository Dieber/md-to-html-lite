class Stack<T> {
  private elems: Array<T> = []
  push(elem: T) {
    this.elems.push(elem)
  }
  pop() {
    return this.elems.pop()
  }
  getTop() {
    return this.elems[this.elems.length - 1]
  }
  isEmpty() {
    return this.elems.length === 0
  }
}

export { Stack }
