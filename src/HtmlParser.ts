// import { JSDOM } from 'jsdom'
const { JSDOM } = require('jsdom')

import { MarkDownNode } from './MarkDownNodeParser'
import { BinTree, BinNode } from './utils/Tree'
import { Stack } from './utils/Stack'
import { NodeTypes } from './utils/types'

const { document } = new JSDOM().window

type valueObj = {
  [key: string]: any
}

const generateDom = (node: BinNode<MarkDownNode>) => {
  let mdNode = node.getData()
  switch (mdNode.getType()) {
    case NodeTypes.RootNode: {
      let div = document.createElement('div')
      div.classList.add('mdl-root')
      return div
    }
    case NodeTypes.Paragraph: {
      let p = document.createElement('p')
      p.classList.add('mdl-p')
      return p
    }
    case NodeTypes.Head: {
      let { level, text } = mdNode.getValue() as valueObj
      let head = document.createElement('h' + level)
      head.classList.add('mdl-h' + level)
      let textNode = document.createTextNode(text)
      head.appendChild(textNode)
      return head
    }
    case NodeTypes.Delete: {
      let textNode = document.createTextNode(mdNode.getValue())
      let del = document.createElement('del')
      del.classList.add('mdl-del')
      del.appendChild(textNode)
      return del
    }
    case NodeTypes.Bold: {
      let textNode = document.createTextNode(mdNode.getValue())
      let b = document.createElement('b')
      b.classList.add('mdl-bold')
      b.appendChild(textNode)
      return b
    }
    case NodeTypes.Span: {
      let textNode = document.createTextNode(mdNode.getValue())
      let span = document.createElement('span')
      span.classList.add('mdl-span')
      span.appendChild(textNode)
      return span
    }
  }
}

const HTMLParser = (markdownTree: BinTree<MarkDownNode>) => {
  let rootNode = markdownTree.getRoot()
  let rootDom = generateDom(rootNode)
  // 遍历二叉树生成Dom树算法
  function visit(node: BinNode<MarkDownNode> | null, dom: any) {
    while (node) {
      let nodeDom = generateDom(node)
      dom.appendChild(nodeDom)
      if (node.getLeft()) {
        visit(node.getLeft(), nodeDom)
      }
      node = node.getRight()
    }
  }
  visit(rootNode, rootDom)
  return rootDom.innerHTML as string
}

export { HTMLParser }
