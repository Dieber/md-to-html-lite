import { JSDOM } from 'jsdom'
// let { JSDOM } = require('jsdom')
import { Token } from './TokenParser'
import { MarkDownNode } from './MarkDownNodeParser'
import { BinTree } from './utils/Tree'

// dom.window.document.body.children.length === 1

const HTMLParser = (tree: BinTree<MarkDownNode>) => {
  console.log(tree)
  let dom = new JSDOM('')
  // let elem = dom.window.document.createElement('div')
  // console.log(elem.innerHTML)
  // console.log(dom)
}

export { HTMLParser }
