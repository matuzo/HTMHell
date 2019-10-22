const { DateTime } = require("luxon");
const prettifyHTML = require('prettify-html');

module.exports = {
  htmlDateString: dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
  },

  readableDate: dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("dd LLL yyyy");
  },

  head: (array, n) => {
    if( n < 0 ) {
      return array.slice(n);
    }

    return array.slice(0, n);
  },

  pretty: value => {
    return prettifyHTML(value)
  }
}
