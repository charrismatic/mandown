rules.tableCell = {
  filter: ['th', 'td'],
  replacement: function (content, node) { return cell(content, node) }
};
rules.tableRow = {
  filter: 'tr',
  replacement: function (content, node) {
    var borderCells = ''; var alignMap = { left: ':--', right: '--:', center: ':-:' };
    if (tests.table_isHeadingRow(node)) {
      for (var i = 0; i < node.childNodes.length; i++) {
        var border = '---';
        var align = ( node.childNodes[i].getAttribute('align') || '' ).toLowerCase();
        if (align) border = alignMap[align] || border; borderCells += cell(border, node.childNodes[i]); }
    }
    return '\n' + content + (borderCells ? '\n' + borderCells : '');
  }
};
rules.table = {
  filter: function (node) { return node.nodeName === 'TABLE' && tests.table_isHeadingRow(node.rows[0]) },
  replacement: function (content) { content = content.replace('\n\n', '\n'); return '\n\n' + content + '\n\n' }
};
rules.tableSection = {
  filter: ['thead', 'tbody', 'tfoot'],
  replacement: function (content) { return content}
};
tests.table_isHeadingRow = (tr) => {
  var parentNode = tr.parentNode;
  var every = Array.prototype.every;
  return ( parentNode.nodeName === 'THEAD' || ( parentNode.firstChild === tr && (parentNode.nodeName === 'TABLE' || tests.table_isFirstTbody(parentNode))
      && every.call(tr.childNodes, function (n) { return n.nodeName === 'TH' })
    )
  )
};
tests.table_isFirstTbody = (element) => {
  var previousSibling = element.previousSibling;
  return ( element.nodeName === 'TBODY'  && ( !previousSibling || ( previousSibling.nodeName === 'THEAD' && /^\s*$/i.test(previousSibling.textContent))))
};
tests.table_cell = (content, node) => {
  var indexOf = Array.prototype.indexOf;
  var index = indexOf.call(node.parentNode.childNodes, node);
  var prefix = ' ';
  if (index === 0) prefix = '| '; return prefix + content + ' |'
};
tests.table_tables = (turndownService) => {
  turndownService.keep(function (node) {
    return node.nodeName === 'TABLE' && !tests.table_isHeadingRow(node.rows[0])
  });
  for (var key in rules) { turndownService.addRule(key, rules[key]); }
};
rules.tableCell = {
  filter: ['th', 'td'],
  replacement: function (content, node) { return cell(content, node) }
};
rules.tableRow = {
  filter: 'tr',
  replacement: function (content, node) {
    var borderCells = ''; var alignMap = { left: ':--', right: '--:', center: ':-:' };
    if (tests.table_isHeadingRow(node)) {
      for (var i = 0; i < node.childNodes.length; i++) {
        var border = '---';
        var align = ( node.childNodes[i].getAttribute('align') || '' ).toLowerCase();
        if (align) border = alignMap[align] || border; borderCells += cell(border, node.childNodes[i]); }
    }
    return '\n' + content + (borderCells ? '\n' + borderCells : '');
  }
};
rules.table = {
  filter: function (node) { return node.nodeName === 'TABLE' && tests.table_isHeadingRow(node.rows[0]) },
  replacement: function (content) { content = content.replace('\n\n', '\n'); return '\n\n' + content + '\n\n' }
};
rules.tableSection = {
  filter: ['thead', 'tbody', 'tfoot'],
  replacement: function (content) { return content}
};
