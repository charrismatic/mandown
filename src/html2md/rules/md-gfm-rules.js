const highlightedCodeBlock = {
    filter: function (node) {
      var firstChild = node.firstChild
      return (
        node.nodeName === 'DIV' &&
        this.highlightRegExp.test(node.className) &&
        firstChild &&
        firstChild.nodeName === 'PRE'
      );
    },
    replacement: function (content, node, options) {
      var className = node.className || ''
      var language = (className.match(highlightRegExp) || [null, ''])[1]
      return (
        '\n\n' + options.fence + language + '\n' +
        node.firstChild.textContent +
        '\n' + options.fence + '\n\n'
      )
    },
    highlightRegExp: /highlight-(?:text|source)-([a-z0-9]+)/
};
const strikethrough = {
    filter: ['del', 's', 'strike'],
    replacement: function (content) { return '~' + content + '~' }
};
const taskListItems = {
    filter: function (node) {
      return node.type === 'checkbox' && node.parentNode.nodeName === 'LI'
    },
    replacement: function (content, node) {
      return (node.checked ? '[x]' : '[ ]') + ' '
  }
};


export const gfm_rules = {
  highlightedCodeBlock: highlightedCodeBlock,
  taskListItems: taskListItems,
  strikethrough: strikethrough
};
