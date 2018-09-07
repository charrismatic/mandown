
# Mandown - Linux man page tools for markdown and html

## **USAGE**

  `mandown [options] PAGE`

## **OPTIONS**

| **Flag**          | **Description**                              |
| ----------------- | -------------------------------------------- |
|  --save-html      |  save print converted html man page to file  |                   
|  --show-html      |  print converted html man page to screen     |                
|  --input <file>   |  input man page from html input              |       
|  --output <file>  |  save converted markdwown to file            |         
|  --pretty         |  show rendered markdown to stdout            |         
|  --debug          |  show debug data and environment variables   |                  



### FUNCTIONS

 - man2md convert man page to markdown
 - man2html convert man page to html

These are used individually by mandown. Converting the man pages takes several steps.
The man to html process uses only Linux packages (see Groff/Troff).  Converting the
html formatted  man page to markdown is done in Node.js.  There is an option to
render the markdown back to its clean presentation from node, however this will look
similar to the original presentation of the man page.


### REQUIRES:

Linux:

 - groff GNU troff text-formatting system

This is a pretty standard package. In case you have trouble converting the man pages to html
try install the full `groff` package in case your distribution has not included the groff
html formatting package.


Node:

 - turndown
 - turndown-plugin-gfm
 - (Optional) marked
 - (Optional) marked-terminal
