
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

var root = (typeof window !== 'undefined' ? window : {});
var window = root;
// GETS NEW JSDOM IF NOT BROWSER INSTANCE
var document = getDocument();

function getDocument () {
  if (typeof window === 'undefined' || Object.keys(window).length === 0) {
    var JSDOM = require('jsdom').JSDOM;
    var fs = require('fs');
    // var dom = new JSDOM();

    // implementation.createHTMLDocument('');
    // var open_empty_document = function () {return "<html><head></head><body>";};
    // var get_stream_in = function ( data ) { return data;  };
    // var close_empty_document = function () { return "</body></html>";  };
    const { document } = (new JSDOM(`...`)).window;
    // var document = new dom.window.Document;
    // console.log(document);
    return document;
  } else {
    return document;
  }
}


function documentFragment(html) {
  // frag.childNodes.length === 2;
  // frag.querySelector("strong").textContent = "Why hello there!";
  return JSDOM.fragment(html);

}
