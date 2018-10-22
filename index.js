// #!/usr/bin/env node

var encoding = 'utf-8';
var data;

const process_html = (html) => {

  // const html2md = new TurndownService(options.mdconfig);
  var md = require('./lib/html2md')(options.mdconfig).turndown(html);

  if (options.show_html) {
    console.log(html);
  } else {
    if (options.save_html) { let html_out = options.page.html }
    if (options.save_md) { let md_out = options.page.md }
      // console.log(md);
    render_md(md);
  }
  return 0;
}

const render_md = (md) => {
  if (options.pretty === 'yes' ) {
    const marked = require('marked');
    const TerminalRenderer = require('marked-terminal');
    marked.setOptions({
      renderer: new TerminalRenderer()
    });
    console.log( marked(md));
  } else {
   console.log(md);
  }
}

// BOILERPLATE CLI FUNCTIONS
// =====================================================
// PROCESS ENV
const parse_options = () => {
  runtime_options = process.env.MANDOWN_ENV;
  options = Object.assign({}, defaults,JSON.parse(runtime_options));
  if (options.debug) {
    console.log('process env', process.env );
    console.log( 'current options', options );
  }
};

// HANDLE STDIN AND PROCESS
var read_file_sync = (filepath) => {
  const fs = require('fs');
  console.log('Filepath: ', filepath);
  return fs.readFile(filepath,
    function read(err, filedata) {
      if (err) {
        console.log(filedata ,err);
        throw err;
      }
      var filedata= Buffer.from(filedata, encoding).toString('ascii');
      return filedata;
    }
  )
}

var process_file = (filename) => {
  const filepath = Buffer.from(args,'utf8').toString('ascii');
  var filedata = read_file_sync(filepath);
  process_html(filedata);
};

var process_data = () => {
  const content = Buffer.from(data,'utf8').toString('ascii');
  process_html(content);
};

// MAIN
var encoding = 'utf-8';
var data;
let options = {};

const defaults = {
  page: "manpage",
  pretty: false,
  debug: false,
  mdconfig: {
    codeBlockStyle: 'fenced',
    linkStyle: 'inlined',
    linkReferenceStyle: 'full',
    headingStyle: 'atx',
    strongDelimiter: '**',
    emDelimiter: '_',
    fence: '```',
    bulletListMarker: '*',
    hr: '---'
  }
}

parse_options();

if (process.stdin.isTTY) {

  // INPUT AS ARGUMENT
  console.log('reading from file' + process.argv[2] );
  process_file(process.argv[2]);

} else {

  // PIPED INPUT
  data = '';
  process.stdin
    .setEncoding(encoding)
    .on('readable', function() {
      var chunk;
      while ( chunk = process.stdin.read() ){ data += chunk; }
    })
    .on('end', function () {
      data = data.replace(/\n$/, '');
      process_data();
    });
}
