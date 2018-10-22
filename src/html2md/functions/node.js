// BLOCK ELEMENTS
var blockElements = [
  'address', 'article', 'aside', 'audio', 'blockquote', 'body', 'canvas',
  'center', 'dd', 'dir', 'div', 'dl', 'dt', 'fieldset', 'figcaption',
  'figure', 'footer', 'form', 'frameset', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'header', 'hgroup', 'hr', 'html', 'isindex', 'li', 'main', 'menu', 'nav',
  'noframes', 'noscript', 'ol', 'output', 'p', 'pre', 'section', 'table',
  'tbody', 'td', 'tfoot', 'th', 'thead', 'tr', 'ul'
]
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

function isBlank (node) {
  return (
    ['A', 'TH', 'TD', 'IFRAME', 'SCRIPT', 'AUDIO', 'VIDEO'].indexOf(node.nodeName) === -1 &&
    /^\s*$/i.test(node.textContent) &&
    !isVoid(node) &&
    !hasVoid(node)
  )
}

function flankingWhitespace (node) {
  var leading = '';
  var trailing = '';
  if (!node.isBlock) {
    var hasLeading = /^[ \r\n\t]/.test(node.textContent);
    var hasTrailing = /[ \r\n\t]$/.test(node.textContent);

    if (hasLeading && !isFlankedByWhitespace('left', node)) {
      leading = ' ';
    }
    if (hasTrailing && !isFlankedByWhitespace('right', node)) {
      trailing = ' ';
    }
  }
  return { leading: leading, trailing: trailing }
}

function isFlankedByWhitespace (side, node) {
  var sibling;
  var regExp;
  var isFlanked;
  if (side === 'left') {
    sibling = node.previousSibling;
    regExp = / $/;
  } else {
    sibling = node.nextSibling;
    regExp = /^ /;
  }
  if (sibling) {
    if (sibling.nodeType === 3) {
      isFlanked = regExp.test(sibling.nodeValue);
    } else if (sibling.nodeType === 1 && !isBlock(sibling)) {
      isFlanked = regExp.test(sibling.textContent);
    }
  }
  return isFlanked;
}

export default function Node (node) {
  node.isBlock = isBlock(node)
  node.isCode = node.nodeName.toLowerCase() === 'code' || node.parentNode.isCode
  node.isBlank = isBlank(node)
  node.flankingWhitespace = flankingWhitespace(node)
  return node
}
