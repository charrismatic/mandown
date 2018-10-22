
// FIX SPACING AROUND CODE BLOCKS
const pre_spacing = {
  filter: 'pre',
  replacement: function (content) {
    return (''
      + '\n\n```\n' +
      + content
        .trim()
        .replace(/^`\s+/g, '    ')
        .replace(/\s+\n`/g, '')
      + '\n```\n\n');
  }
};
// TABLES ROW TO LIST
// const table_row_list = {
//   filter: 'tr',
//   replacement: function (content) {
//     content = content.replace(/^\+|\n\n$/g, '');
//     const cols = content.querySelectorAll('td');
//     let out = '';
//     cols.forEach(function(col){
//       out = out + ' + ' + col.innerText + ' - ';
//     });
//     return '\n| ' + content.replace(/\n/g , ' ') + ' \n';
//   }
// };
export const ext_rules = {
  pre_spacing: pre_spacing,
  // table_row_list: table_row_list,
};
