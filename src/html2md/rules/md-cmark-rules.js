// DEFAULT RULES
// ----------------------------------------------------------------------------
const paragraph = {
  filter: 'p',
  replacement: function (content) {
    return '\n\n' + content + '\n\n'
  }
};
const lineBreak = {
  filter: 'br',
  replacement: function (content, node, options) {
    return options.br + '\n'
  }
};
const heading = {
  filter: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
  replacement: function (content, node, options) {
    var hLevel = Number(node.nodeName.charAt(1));
    if (options.headingStyle === 'setext' && hLevel < 3) {
      var underline = this.repeat((hLevel === 1 ? '=' : '-'), content.length);
      return ( '\n\n' + content + '\n' + underline + '\n\n' )
    } else {
      return '\n\n' + this.repeat('#', hLevel) + ' ' + content + '\n\n'
    }
  },
  repeat: function (character, count) {
    return Array(count + 1).join(character)
  }
};
const blockquote = {
  filter: 'blockquote',
  replacement: function (content) {
    content = content.replace(/^\n+|\n+$/g, '');
    content = content.replace(/^/gm, '> ');
    return '\n\n' + content + '\n\n'
  }
};
const list = {
  filter: ['ul', 'ol'],
  replacement: function (content, node) {
    var parent = node.parentNode;
    if (parent.nodeName === 'LI' && parent.lastElementChild === node) {
      return '\n' + content
    } else {
      return '\n\n' + content + '\n\n'
    }
  }
};
const listItem = {
  filter: 'li',
  replacement: function (content, node, options) {
    content = content
      .replace(/^\n+/, '') // remove leading newlines
      .replace(/\n+$/, '\n') // replace trailing newlines with just a single one
      .replace(/\n/gm, '\n    '); // indent
    var prefix = options.bulletListMarker + '   ';
    var parent = node.parentNode;
    if (parent.nodeName === 'OL') {
      var start = parent.getAttribute('start');
      var index = Array.prototype.indexOf.call(parent.children, node);
      prefix = (start ? Number(start) + index : index + 1) + '.  ';
    }
    return (
      prefix + content + (node.nextSibling && !/\n$/.test(content) ? '\n' : '')
    )
  }
};
const indentedCodeBlock = {
  filter: function (node, options) {
    return (
      options.codeBlockStyle === 'indented' &&
      node.nodeName === 'PRE' &&
      node.firstChild &&
      node.firstChild.nodeName === 'CODE'
    )
  },
  replacement: function (content, node, options) {
    return ( '\n\n    ' + node.firstChild.textContent.replace(/\n/g, '\n    ') + '\n\n' )
  }
};
const fencedCodeBlock = {
  filter: function (node, options) {
    return (
      options.codeBlockStyle === 'fenced' &&
      node.nodeName === 'PRE' &&
      node.firstChild &&
      node.firstChild.nodeName === 'CODE'
    )
  },
  replacement: function (content, node, options) {
    var className = node.firstChild.className || '';
    var language = (className.match(/language-(\S+)/) || [null, ''])[1];
    return (
      '\n\n' + options.fence + language + '\n' +
      node.firstChild.textContent +
      '\n' + options.fence + '\n\n'
    )
  }
};
const horizontalRule = {
  filter: 'hr',
  replacement: function (content, node, options) {
    return '\n\n' + options.hr + '\n\n'
  }
};
const inlineLink = {
  filter: function (node, options) {
    return (
      options.linkStyle === 'inlined' &&
      node.nodeName === 'A' &&
      node.getAttribute('href')
    )
  },
  replacement: function (content, node) {
    var href = node.getAttribute('href');
    var title = node.title ? ' "' + node.title + '"' : '';
    return '[' + content + '](' + href + title + ')'
  }
};
const referenceLink = {
  filter: function (node, options) {
    return (
      options.linkStyle === 'referenced' &&
      node.nodeName === 'A' &&
      node.getAttribute('href')
    )
  },
  replacement: function (content, node, options) {
    var href = node.getAttribute('href');
    var title = node.title ? ' "' + node.title + '"' : '';
    var replacement;
    var reference;
    switch (options.linkReferenceStyle) {
      case 'collapsed':
        replacement = '[' + content + '][]';
        reference = '[' + content + ']: ' + href + title;
        break
      case 'shortcut':
        replacement = '[' + content + ']';
        reference = '[' + content + ']: ' + href + title;
        break
      default:
        var id = this.references.length + 1;
        replacement = '[' + content + '][' + id + ']';
        reference = '[' + id + ']: ' + href + title;
    }
    this.references.push(reference);
    return replacement
  },
  references: [],
  append: function (options) {
    var references = '';
    if (this.references.length) {
      references = '\n\n' + this.references.join('\n') + '\n\n';
      // Reset references
      this.references = [];
    }
    return references
  }
};
const emphasis = {
  filter: ['em', 'i'],
  replacement: function (content, node, options) {
    if (!content.trim()) return ''
    return options.emDelimiter + content + options.emDelimiter
  }
};
const strong = {
  filter: ['strong', 'b'],
  replacement: function (content, node, options) {
    if (!content.trim()) return ''
    return options.strongDelimiter + content + options.strongDelimiter
  }
};
const code = {
  filter: function (node) {
    var hasSiblings = node.previousSibling || node.nextSibling;
    var isCodeBlock = node.parentNode.nodeName === 'PRE' && !hasSiblings;
    return node.nodeName === 'CODE' && !isCodeBlock
  },
  replacement: function (content) {
    if (!content.trim()) return ''
    var delimiter = '`';
    var leadingSpace = '';
    var trailingSpace = '';
    var matches = content.match(/`+/gm);
    if (matches) {
      if (/^`/.test(content)) leadingSpace = ' ';
      if (/`$/.test(content)) trailingSpace = ' ';
      while (matches.indexOf(delimiter) !== -1) delimiter = delimiter + '`';
    }
    return delimiter + leadingSpace + content + trailingSpace + delimiter
  }
};
const image = {
  filter: 'img',
  replacement: function (content, node) {
    var alt = node.alt || '';
    var src = node.getAttribute('src') || '';
    var title = node.title || '';
    var titlePart = title ? ' "' + title + '"' : '';
    return src ? '![' + alt + ']' + '(' + src + titlePart + ')' : ''
  }
};

export const cmark_rules = {
  paragraph: paragraph,
  lineBreak: lineBreak,
  heading: heading,
  blockquote: blockquote,
  list: list,
  listItem: listItem,
  indentedCodeBlock: indentedCodeBlock,
  fencedCodeBlock: fencedCodeBlock,
  horizontalRule: horizontalRule,
  inlineLink: inlineLink,
  referenceLink: referenceLink,
  emphasis: emphasis,
  strong: strong,
  code: code,
  image: image
};
