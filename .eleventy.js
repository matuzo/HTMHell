const authors = require('./hell/_data/authors.js')
const pluginRss = require("@11ty/eleventy-plugin-rss");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const filters = require('./_11ty/filters.js')
const pluginPWA = require('eleventy-plugin-pwa');

module.exports = function(eleventyConfig) {
   // Filters
   Object.keys(filters).forEach(filterName => {
    eleventyConfig.addFilter(filterName, filters[filterName])
  });

  // Shortcodes
  eleventyConfig.addNunjucksShortcode("author", function(id) {
    let authorHTML;
    authors.authors.filter(author => {
      if (author.id === id) {
        authorHTML = `<a href="${ author.link }" rel="noopener">${ author.name }</a>`;
      }
    });
    return authorHTML;
  });

  // Collections
  eleventyConfig.addCollection("entries", function(collection) {
    return collection.getFilteredByGlob("./hell/entries/*.md");
  });

  // Plugins
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addPassthroughCopy({"./hell/assets": "assets"});
  eleventyConfig.addPassthroughCopy({"./hell/favicon/*": "/"});
  eleventyConfig.addPassthroughCopy("./hell/images");
  eleventyConfig.addPassthroughCopy("./hell/robots.txt");

  eleventyConfig.addPlugin(pluginPWA);
  
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

