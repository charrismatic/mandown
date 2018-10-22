#!/usr/bin/env node

var encoding = 'utf-8';
var data;
const marked = require('marked');
const TerminalRenderer = require('marked-terminal');


let options = {};
const defaults = {
  page: "manpage",
  pretty: false,
  debug: false,
  markedconfig: {
  //   // Colors
  //   code: chalk.yellow,
  //   blockquote: chalk.gray.italic,
  //   html: chalk.gray,
  //   heading: chalk.green.bold,
  //   firstHeading: chalk.magenta.underline.bold,
  //   hr: chalk.reset,
  //   listitem: chalk.reset,
  //   table: chalk.reset,
  //   paragraph: chalk.reset,
  //   strong: chalk.bold,
  //   em: chalk.italic,
  //   codespan: chalk.yellow,
  //   del: chalk.dim.gray.strikethrough,
  //   link: chalk.blue,
  //   href: chalk.blue.underline,
    // Formats the bulletpoints and numbers for lists
    list: function (body, ordered) {/* ... */},
    // Reflow and print-out width
    width: 80, // only applicable when reflow is true
    reflowText: false,
    // Should it prefix headers?
    showSectionPrefix: true,
    // Whether or not to undo marked escaping
    // of enitities (" -> &quot; etc)
    unescape: true,
    // Whether or not to show emojis
    emoji: true,
    // Options passed to cli-table
    tableOptions: {},
    // The size of tabs in number of spaces or as tab characters
    tab: 3 // examples: 4, 2, \t, \t\t
  }
}


// PROCESS ENV
const parse_options = () => {
  runtime_options = process.env.MANDOWN_ENV;
  options = Object.assign({}, defaults);
  if (options.debug) {
    console.log('process env', process.env );
    console.log( 'current options', options );
  }
  return;
};



const process_data = () => {
  const md = Buffer.from(data,'utf8').toString('ascii');
  render_md(md)
  return;
}



const render_md = (data) => {
    marked.setOptions({
      renderer: new TerminalRenderer()
    });
    console.log( marked(data) );
    return;
}


parse_options();

// READ INPUT AS ARGUMENT
if (process.stdin.isTTY) {
  data = new Buffer(process.argv[2] || '', encoding);
  process_data();
}

// PIPED INPUT
else {
  data = '';
  process.stdin.setEncoding(encoding);
  process.stdin.on('readable', function() {
    var chunk;
    while (chunk = process.stdin.read()) {
      data += chunk;
    }
  });
  process.stdin.on('end', function () {
    data = data.replace(/\n$/, '');
    process_data();
  });
}
