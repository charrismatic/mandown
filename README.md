
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

These are used individually by mandown. Converting the man pages to md takes multiple steps. This also allows the user to call the functions separately for more customizable uses.  

The man-to-html process uses the default (linux) packages used by the man command to build manpages from the original sourece (see Groff/Troff).  

Converting the man page html To markdown is done in Node.js. The original package used for converting is Turndown.js but has been forked to use JSDOM to provide a browserless dom parser.

In addition to converting the man page to markdown you may also render the markdown directly in the terminal (in a addition to output to file) using a plugin for the 'Marked' markdown package.


### REQUIRES:

Linux:

 - groff GNU troff text-formatting system

This is a standard package. In case you have trouble converting the man pages to html try installing the full `groff` package in case your distribution has only included the groff core.


Node:

 - turndown
 - turndown-plugin-gfm
 - (Optional) marked
 - (Optional) marked-terminal
