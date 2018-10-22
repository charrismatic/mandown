import collapseWhitespace from './collapse_whitespace'
import HTMLParser from './html_parser'

var blockElements = [
  'address', 'article', 'aside', 'audio', 'blockquote', 'body', 'canvas',
  'center', 'dd', 'dir', 'div', 'dl', 'dt', 'fieldset', 'figcaption',
  'figure', 'footer', 'form', 'frameset', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'header', 'hgroup', 'hr', 'html', 'isindex', 'li', 'main', 'menu', 'nav',
  'noframes', 'noscript', 'ol', 'output', 'p', 'pre', 'section', 'table',
  'tbody', 'td', 'tfoot', 'th', 'thead', 'tr', 'ul'
]
// BLOCK ELEMENTS
function isBlock (node) {
  return blockElements.indexOf(node.nodeName.toLowerCase()) !== -1
}
// VOID ELEMENTS
var voidElements = [
  'area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input',
  'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'
]
var voidSelector = voidElements.join()
function isVoid (node) {
  return voidElements.indexOf(node.nodeName.toLowerCase()) !== -1
}
function hasVoid (node) {
  return node.querySelector && node.querySelector(voidSelector)
}
export default function RootNode (input) {
  var root
  if (typeof input === 'string') {
    // DOM parsers arrange elements in the <head> and <body>.
    // Wrapping in a custom element ensures elements are reliably arranged in
    // a single element.
    var doc = htmlParser().parseFromString(
      '<x-turndown id="turndown-root">' + input + '</x-turndown>',
      'text/html'
    )
    root = doc.getElementById('turndown-root');
  } else {
    root = input.cloneNode(true);
  }
  collapseWhitespace({
    element: root,
    isBlock: isBlock,
    isVoid: isVoid
  })

  return root
}
var _htmlParser
function htmlParser () {
  _htmlParser = _htmlParser || new HTMLParser()
  return _htmlParser
}
