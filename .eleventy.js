const authors = require('./hell/_data/authors.js')
const pluginRss = require("@11ty/eleventy-plugin-rss");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const filters = require('./_11ty/filters.js')
const pluginPWA = require('eleventy-plugin-pwa');
const htmlmin = require('html-minifier');
const markdownIt = require('markdown-it');
const markdownItAnchor = require("markdown-it-anchor");
const slugify = require("slugify");

module.exports = function (eleventyConfig) {
  // Filters
  Object.keys(filters).forEach(filterName => {
    eleventyConfig.addFilter(filterName, filters[filterName])
  });

  // Shortcodes
  eleventyConfig.addNunjucksShortcode("author", function (id) {
    let authorHTML;
    authors.authors.filter(author => {
      if (author.id === id) {
        authorHTML = `<a href="${author.link}" rel="noopener">${author.name}</a>`;
      }
    });
    return authorHTML;
  });

  // Transforms
  eleventyConfig.addTransform('htmlmin', function (content, outputPath) {
    if (outputPath.endsWith('.html')) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }

    return content;
  });

  // Collections
  eleventyConfig.addCollection("entries", function (collection) {
    return collection.getFilteredByGlob("./hell/entries/*.md");
  });

	function markdownItSlugify(s) {
		return slugify(s, { lower: true, remove: /[:’'.`,]/g });
	}

	let mdIt = markdownIt({
		html: true,
		breaks: true,
		linkify: true
  })
  
	.use(markdownItAnchor, {
		permalink: true,
		slugify: markdownItSlugify,
		permalinkBefore: true,
    permalinkSymbol: "#",
    renderPermalink: (slug, opts, state, idx) => {
      const headingText = state.tokens[idx + 1].children[0].content;
      const headingHTML= `<span class="u-hidden">${headingText}</span>`;

      const space = () => Object.assign(new state.Token('text', '', 0), { content: ' ' })
      const linkTokens = [
        Object.assign(new state.Token('link_open', 'a', 1), {
          attrs: [
            ['href', opts.permalinkHref(slug, state)],
            ...Object.entries(opts.permalinkAttrs(slug, state))
          ]
        }),
        Object.assign(new state.Token('html_block', '', 0), { content:  `<span aria-hidden="true">${opts.permalinkSymbol}</span>` + headingHTML }),
        new state.Token('link_close', 'a', -1)
      ]
    
      linkTokens.push(space())
      state.tokens[idx + 1].children.unshift(...linkTokens)
    },
		level: [2, 3]
	});

	eleventyConfig.setLibrary("md", mdIt);

  // Plugins
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addPassthroughCopy({ "./hell/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "./hell/favicon/*": "/" });
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

