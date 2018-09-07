// FIX TIGHT SPACING AROUND CODE BLOCKS
const pre_spacing = {
  filter: 'pre',
  replacement: function (content) {
    let output = '';
    output += '\n\n```\n';
    output += content.trim().replace(/^`\s+/g, '    ').replace(/\s+\n`/g, '');
    output += '\n```\n\n';
    return output;
  }
};
// TABLES ROW TO LIST
const table_row = {
  filter: 'tr',
  replacement: function (content) {
    content = content.replace(/^\+|\n\n$/g, '');
    const cols = content.querySelectorAll('td');
    let out = '';
    cols.forEach(function(col){
      out = out + ' + ' + col.innerText + ' - ';
    });
    return '\n| ' + content.replace(/\n/g , ' ') + ' \n';
  }
};

module.exports = {
  table_row: table_row,
  pre_spacing: pre_spacing,
};
