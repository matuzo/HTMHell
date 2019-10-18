const { DateTime } = require("luxon");
const prettifyHTML = require('prettify-html');

module.exports = {
  // Date formatting (machine readable)
  // machineDate: dateObj => {
  //   return DateTime.fromJSDate(dateObj).toFormat("yyyy-MM-ddT00:00:00+00:00");
  // },

  // // Date formatting (human readable)
  // readableDate: dateObj => {
  //   let date = DateTime.fromJSDate(dateObj);

  //   if (typeof dateObj === 'string') {
  //     date = DateTime.fromFormat(dateObj.split(" GMT")[0], "ccc LLL dd y hh:mm:ss");
  //   }

  //   return date.toFormat("LLLL d., yyyy");
  // },

  pretty: value => {
    return prettifyHTML(value)
  }
}
