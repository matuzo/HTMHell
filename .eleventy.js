// const filters = require('./_11ty/filters.js')
// const collections = require('./_11ty/collections.js')
// const transforms = require('./_11ty/transforms.js')

const pluginRss = require("@11ty/eleventy-plugin-rss");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const { DateTime } = require("luxon");
const filters = require('./_11ty/filters.js')

module.exports = function(eleventyConfig) {

   // Filters
   Object.keys(filters).forEach(filterName => {
    eleventyConfig.addFilter(filterName, filters[filterName])
  });

  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("dd LLL yyyy");
  });
  // // Filters
  // Object.keys(filters).forEach(filterName => {
  //   eleventyConfig.addFilter(filterName, filters[filterName])
  // });

  // // Collections
  // Object.keys(collections).forEach(collectionName => {
  //   console.log(collectionName)
  //   eleventyConfig.addCollection(collectionName, collections[collectionName])
  // });

  // // Transforms
  // Object.keys(transforms).forEach(transformName => {
  //   console.log(transformName)
  //   eleventyConfig.addTransform(transformName, transforms[transformName])
  // });

  // Plugins
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(syntaxHighlight);

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter("head", (array, n) => {
    if( n < 0 ) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });


  eleventyConfig.addFilter('htmlDateString', (dateObj) => {
    return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
  });


  eleventyConfig.addCollection("entries", function(collection) {
    return collection.getFilteredByGlob("./hell/entries/*.md");
  });

  eleventyConfig.addPassthroughCopy("./hell/assets");
  
  return {
    templateFormats: [
      "md",
      "njk"
    ],

    pathPrefix: "/",

    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    passthroughFileCopy: true,
    dir: {
      input: "hell",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};

