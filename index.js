#!/usr/bin/env node

var encoding = 'utf-8';
var data;

const TurndownService = require('turndown');
const mdgithub_rules = require('turndown-plugin-gfm');
const mdcustom_rules = require('./lib/custom_rules');

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


// PROCESS ENV
const parse_options = () => {
  runtime_options = process.env.MANDOWN_ENV;
  options = Object.assign({}, defaults,JSON.parse(runtime_options));

  if (options.debug) {
    console.log('process env', process.env );
    console.log( 'current options', options );
  }
};


const process_data = () => {
  const html = Buffer.from(data,'utf8').toString('ascii');
  const html2md = new TurndownService(options.mdconfig);
  const gfm_rules = mdgithub_rules.gfm;
  html2md.use(gfm_rules);
  html2md.addRule('pre_spacing', mdcustom_rules.pre_spacing);

  if (options.show_html) {
    console.log(html);
  } else {
    const md = html2md.turndown(html);
    render_md(md);
  }

  if (options.save_html) {
    let html_out = options.page.html;
  }
  if (options.save_md) {
    let md_out = options.page.md;

  }
  return;
}


const render_md = (data) => {
  if (options.pretty === 'yes' ) {
    const marked = require('marked');
    const TerminalRenderer = require('marked-terminal');
    marked.setOptions({
      renderer: new TerminalRenderer()
    });
    console.log( marked(data) );
  } else {
   console.log(data);
  }
}


// MERGE OPTIONS WITH DEFAULTS
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
