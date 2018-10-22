
// A tr is a heading row if:
// - parent is a THEAD
// - the first child of TABLE or first TBODY
// - every cell is TH
function isHeadingRow (tr) {
  let parentNode = tr.parentNode;
  let every = Array.prototype.every;

  const isFirstTbody = (element) => {
    let previousSibling = element.previousSibling;
    return ( element.nodeName === 'TBODY' && ( !previousSibling ||
      (previousSibling.nodeName === 'THEAD' && /^\s*$/i.test(previousSibling.textContent))
    ))
  };
  return (parentNode.nodeName === 'THEAD' || (parentNode.firstChild === tr
    && (parentNode.nodeName === 'TABLE' || isFirstTbody(parentNode))
    && every.call(tr.childNodes, function (n) { return n.nodeName === 'TH' })
  ));
}

function table_cell (content, node) {
  var indexOf = Array.prototype.indexOf
  var index = indexOf.call(node.parentNode.childNodes, node)
  var prefix = ' '
  if (index === 0) prefix = '| '
  return prefix + content + ' |'
}


var rules = {}
rules.tableCell = {
  filter: ['th', 'td'],
  replacement: function (content, node) {
    return this.cell(content, node);
  },
  cell: table_cell
}
rules.tableRow = {
  filter: 'tr',
  replacement: function (content, node) {
    var borderCells = ''
    var alignMap = { left: ':--', right: '--:', center: ':-:' }
    if (this.isHeadingRow(node)) {
      for (var i = 0; i < node.childNodes.length; i++) {
        var border = '---'
        var align = (
          node.childNodes[i].getAttribute('align') || ''
        ).toLowerCase()

        if (align) border = alignMap[align] || border

        borderCells += this.cell(border, node.childNodes[i])
      }
    }
    return '\n' + content + (borderCells ? '\n' + borderCells : '')
  },
  isHeadingRow: isHeadingRow,
  cell: table_cell,
}
rules.table = {
  // Only convert tables with a heading row.
  // Tables with no heading row are kept using `keep` (see below).
  filter: function (node) {
    return node.nodeName === 'TABLE' && this.isHeadingRow(node.rows[0])
  },
  replacement: function (content) {
    // Ensure there are no blank lines
    content = content.replace('\n\n', '\n')
    return '\n\n' + content + '\n\n'
  },
  isHeadingRow: isHeadingRow,
}
rules.tableSection = {
  filter: ['thead', 'tbody', 'tfoot'],
  replacement: function (content) {
    return content
  }
}

export default function tables (turndownService) {
  turndownService.keep(function (node) {
    return node.nodeName === 'TABLE'
      && !isHeadingRow(node.rows[0])
  })
  for (var key in rules) turndownService.addRule(key, rules[key])
}
