const { DateTime } = require("luxon");
const beautify_css = require('js-beautify').css;
const beautify_html = require('js-beautify').html;
const MarkdownIt = require('markdown-it');

module.exports = {
  htmlDateString: dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
  },

  readableDate: dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("LLL dd, yyyy");
  },

  head: (array, n) => {
    if( n < 0 ) {
      return array.slice(n);
    }

    return array.slice(0, n);
  },

  pretty: value => {
    return beautify_html(value, {
      "indent_size": 2,
      "inline": ""
    })
  },

  prettyCSS: value => {
    return beautify_css(value, {
      "indent_size": 2
    })
  },

  entryNumber: string => {
    return string.split(' ')[0]
  },

  md: value => {
    const md = new MarkdownIt();
    return md.render(value);
  } 
}
