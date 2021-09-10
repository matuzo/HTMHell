module.exports = [
  {
    label: 'A',
    elements: [
      {
        name: 'a',
        description:
          "If the `a` element has an `href` attribute, then it represents a hyperlink (a hypertext anchor) labeled by its contents.\n\nIf the `a` element has no `href` attribute, then the element represents a placeholder for where a link might otherwise have been placed, if it had been relevant, consisting of just the element's contents.\n\nThe `target`, `download`, `ping`, `rel`, `hreflang`, `type`, and `referrerpolicy` attributes must be omitted if the `href` attribute is not present.",
        link: 'https://html.spec.whatwg.org/#the-a-element',
        codepen: 'dypJzeJ',
        code: '<a href="https://htmhell.dev">\n  HTMHell\n</a>',
        froboo: 'https://www.frontendbookmarks.com/html/elements/a/',
      },
      {
        name: 'abbr',
        description:
          'Represents an abbreviation or acronym, optionally with its expansion. The `title` attribute may be used to provide an expansion of the abbreviation. The attribute, if specified, must contain an expansion of the abbreviation, and nothing else.',
        link: 'https://html.spec.whatwg.org/#the-abbr-element',
        codepen: 'xxEpLar',
        code: '<abbr title="Hypertext Markup Language">\n  HTML\n</abbr>',
      },
      {
        name: 'address',
        description:
          'Represents the contact information for its nearest `article` or `body` element ancestor. If that is the `body` element, then the contact information applies to the document as a whole.',
        link: 'https://html.spec.whatwg.org/#the-address-element',
        codepen: 'xxEWRyp',
        code:
          ' <address>\n  For more details, contact<a href="mailto:manuel@matuzo.at">Manuel</a>.\n</address>',
      },
      {
        name: 'area',
        description:
          'Represents either a hyperlink with some text and a corresponding area on an image map, or a dead area on an image map.\n\nAn `area` element with a parent node must have a `map` element ancestor.',
        link: 'https://html.spec.whatwg.org/#the-area-element',
        codepen: 'ExgENrb',
        code:
          '<img src="https://assets.codepen.io/144736/Screenshot+2021-01-02+at+19.46.44.png" usemap="#map">\n\n<map name="map">\n  <area target="_blank" alt="HTMHell" title="HTMHell" href="http://www.htmhell.dev" coords="404,529,45,437" shape="rect">\n</map>',
      },
      {
        name: 'article',
        description:
          'Represents a complete, or self-contained, composition in a document, page, application, or site and that is, in principle, independently distributable or reusable, e.g. in syndication. This could be a forum post, a magazine or newspaper article, a blog entry, a user-submitted comment, an interactive widget or gadget, or any other independent item of content.',
        link: 'https://html.spec.whatwg.org/#the-article-element',
        codepen: 'dypmOQq',
        code:
          '<article itemscope itemtype="http://schema.org/BlogPosting">\n  <h1 itemprop="headline">The heading</h1>\n  <p>...</p>\n</article>',
        froboo: 'https://www.frontendbookmarks.com/html/elements/article/',
      },
      {
        name: 'aside',
        description:
          'Represents a section of a page that consists of content that is tangentially related to the content around the aside element, and which could be considered separate from that content. Such sections are often represented as sidebars in printed typography.',
        link: 'https://html.spec.whatwg.org/#the-aside-element',
        codepen: 'qBaoqvK',
        code:
          '<article itemscope itemtype="http://schema.org/BlogPosting">\n  <h1 itemprop="headline">The heading</h1>\n  <p>...</p>\n</article><aside>\n  <h2>Related articles</h2>\n  <ul>\n    <li>…</li>\n  </ul>\n</aside>',
      },
      {
        name: 'audio',
        description:
          'Represents a sound or audio stream. epresents a sound or audio stream. Content may be provided inside the `audio` element. User agents should not show this content to the user; it is intended for older web browsers which do not support audio, so that legacy audio plugins can be tried, or to show text to the users of these older browsers informing them of how to access the audio contents.',
        link: 'https://html.spec.whatwg.org/#the-audio-element',
        codepen: 'oNzqYra',
        code:
          '<audio src="https://assets.codepen.io/144736/demo.mp3" controls>\n  Your browser does not support the <code>audio</code> element.\n</audio>',
      },
    ],
  },
  {
    label: 'B',
    elements: [
      {
        name: 'b',
        description:
          'Represents a span of text to which attention is being drawn for utilitarian purposes without conveying any extra importance and with no implication of an alternate voice or mood, such as key words in a document abstract, product names in a review, actionable words in interactive text-driven software, or an article lede.',
        link: 'https://html.spec.whatwg.org/#the-b-element',
        codepen: '',
      },
      {
        name: 'base',
        description:
          'The `base` element allows authors to specify the document base URL for the purposes of parsing URLs, and the name of the default browsing context for the purposes of following hyperlinks. The element does not represent any content beyond this information. There must be no more than one `base` element per document.\n\nA `base` element must have either an `href` attribute, a `target` attribute, or both.',
        link: 'https://html.spec.whatwg.org/#the-base-element',
        codepen: '',
      },
      {
        name: 'bdi',
        description:
          'Represents a span of text that is to be isolated from its surroundings for the purposes of bidirectional text formatting.',
        link: 'https://html.spec.whatwg.org/#the-bdi-element',
        codepen: '',
      },
      {
        name: 'bdo',
        description:
          'Represents explicit text directionality formatting control for its children. It allows authors to override the Unicode bidirectional algorithm by explicitly specifying a direction override.',
        link: 'https://html.spec.whatwg.org/#the-bdo-element',
        codepen: '',
      },
      {
        name: 'blockquote',
        description:
          'Represents a section that is quoted from another source. Content inside a `blockquote` must be quoted from another source, whose address, if it has one, may be cited in the `cite` attribute.',
        link: 'https://html.spec.whatwg.org/#the-blockquote-element',
        codepen: '',
      },
      {
        name: 'body',
        description: 'Represents the contents of the document.',
        link: 'https://html.spec.whatwg.org/#the-body-element',
        codepen: '',
      },
      {
        name: 'br',
        description: 'Represents a line break.',
        link: 'https://html.spec.whatwg.org/#the-br-element',
        codepen: '',
      },
      {
        name: 'button',
        description: 'Represents a button labeled by its contents.',
        link: 'https://html.spec.whatwg.org/#the-button-element',
        codepen: '',
        froboo: 'https://www.frontendbookmarks.com/html/elements/button/',
      },
    ],
  },
  {
    label: 'C',
    elements: [
      {
        name: 'canvas',
        description:
          'Provides scripts with a resolution-dependent bitmap `canvas`, which can be used for rendering graphs, game graphics, art, or other visual images on the fly. Authors should not use the `canvas` element in a document when a more suitable element is available. For example, it is inappropriate to use a `canvas` element to render a page heading: if the desired presentation of the heading is graphically intense, it should be marked up using appropriate elements (typically h1) and then styled using CSS and supporting technologies such as shadow trees.',
        link: 'https://html.spec.whatwg.org/#the-canvas-element',
        codepen: '',
      },
      {
        name: 'caption',
        description:
          'Represents the title of the `table` that is its parent, if it has a parent and that is a `table` element.',
        link: 'https://html.spec.whatwg.org/#the-caption-element',
        codepen: '',
      },
      {
        name: 'cite',
        description:
          'Represents the title of a work (e.g. a book, a paper, an essay, a poem, a score, a song, a script, a film, a TV show, a game, a sculpture, a painting, a theatre production, a play, an opera, a musical, an exhibition, a legal case report, a computer program, etc). This can be a work that is being quoted or referenced in detail (i.e. a citation), or it can just be a work that is mentioned in passing.\n\nA person’s name is not the title of a work — even if people call that person a piece of work — and the element must therefore not be used to mark up people’s names. (In some cases, the `b` element might be appropriate for names; e.g. in a gossip article where the names of famous people are keywords rendered with a different style to draw attention to them. In other cases, if an element is really needed, the `span` element can be used.).',
        link: 'https://html.spec.whatwg.org/#the-cite-element',
        codepen: '',
      },
      {
        name: 'code',
        description:
          'Represents a fragment of computer code. This could be an XML element name, a file name, a computer program, or any other string that a computer would recognize.',
        link: 'https://html.spec.whatwg.org/#the-code-element',
        codepen: '',
      },
      {
        name: 'col',
        description:
          'If a `col` element has a parent and that is a `colgroup` element that itself has a parent that is a `table` element, then the `col` element represents one or more columns in the column group represented by that `colgroup`.',
        link: 'https://html.spec.whatwg.org/#the-col-element',
        codepen: '',
      },
      {
        name: 'colgroup',
        description:
          'Represents a group of one or more columns in the `table` that is its parent, if it has a parent and that is a `table` element.',
        link: 'https://html.spec.whatwg.org/#the-code-element',
        codepen: '',
      },
    ],
  },
  {
    label: 'D',
    elements: [
      {
        name: 'data',
        description:
          'Represents its contents, along with a machine-readable form of those contents in the `value` attribute. The `value` attribute must be present. Its value must be a representation of the element’s contents in a machine-readable format.\n\nWhen combined with microformats or the microdata attributes defined in this specification, the element serves to provide both a machine-readable value for the purposes of data processors, and a human-readable value for the purposes of rendering in a web browser. In this case, the format to be used in the `value` attribute is determined by the microformats or microdata vocabulary in use.\n\nThe element can also, however, be used in conjunction with scripts in the page, for when a script has a literal value to store alongside a human-readable value. In such cases, the format to be used depends only on the needs of the script. (The `data-*` attributes can also be useful in such situations.)',
        link: 'https://html.spec.whatwg.org/#the-data-element',
        codepen: '',
      },
      {
        name: 'datalist',
        description:
          'Represents a set of `option` elements that represent predefined options for other controls. In the rendering, the `datalist` element represents nothing and it, along with its children, should be hidden.\nThe `datalist` element can be used in two ways. In the simplest case, the ``datalist` element has just `option` element children. In the more elaborate case, the `datalist` element can be given contents that are to be displayed for down-level clients that don’t support `datalist`. In this case, the `option` elements are provided inside a `select` element inside the `datalist` element.',
        link: 'https://html.spec.whatwg.org/#the-datalist-element',
        codepen: '',
      },
      {
        name: 'dd',
        description:
          'Represents the description, definition, or value, part of a term-description group in a description list (`dl` element).',
        link: 'https://html.spec.whatwg.org/#the-dd-element',
        codepen: '',
      },
      {
        name: 'del',
        description: 'Represents a removal from the document.',
        link: 'https://html.spec.whatwg.org/#the-del-element',
        codepen: '',
      },
      {
        name: 'details',
        description:
          'Represents a disclosure widget from which the user can obtain additional information or controls.',
        link: 'https://html.spec.whatwg.org/#the-details-element',
        codepen: '',
        froboo: 'https://www.frontendbookmarks.com/html/elements/details/',
      },
      {
        name: 'dfn',
        description:
          'Represents the defining instance of a term. The paragraph, description list group, or section that is the nearest ancestor of the `dfn` element must also contain the definition(s) for the term given by the `dfn` element.',
        link: 'https://html.spec.whatwg.org/#the-dfn-element',
        codepen: '',
      },
      {
        name: 'dialog',
        description:
          'Represents a part of an application that a user interacts with to perform a task, for example a dialog box, inspector, or window.',
        link: 'https://html.spec.whatwg.org/#the-dialog-element',
        codepen: '',
        froboo: 'https://www.frontendbookmarks.com/html/elements/dialog/',
      },
      {
        name: 'div',
        description:
          'It has no special meaning at all. It represents its children. It can be used with the `class`, `lang`, and `title` attributes to mark up semantics common to a group of consecutive elements. It can also be used in a `dl` element, wrapping groups of `dt` and `dd` elements.',
        link: 'https://html.spec.whatwg.org/#the-div-element',
        codepen: '',
      },
      {
        name: 'dl',
        description:
          'Represents an association list consisting of zero or more name-value groups (a description list). A name-value group consists of one or more names (`dt` elements, possibly as children of a `div` element child) followed by one or more values (`dd` elements, possibly as children of a `div` element child), ignoring any nodes other than `dt` and `dd` element children, and `dt` and `dd` elements that are children of `div` element children. Within a single `dl` element, there should not be more than one `dt` element for each name.',
        link: 'https://html.spec.whatwg.org/#the-dl-element',
        codepen: '',
      },
      {
        name: 'dt',
        description:
          'Represents the term, or name, part of a term-description group in a description list (`dl` element).',
        link: 'https://html.spec.whatwg.org/#the-dt-element',
        codepen: '',
      },
    ],
  },
  {
    label: 'E',
    elements: [
      {
        name: 'em',
        description:
          'Represents stress emphasis of its contents.\n\nThe level of stress that a particular piece of content has is given by its number of ancestor `em` elements.\n\nThe placement of stress emphasis changes the meaning of the sentence. The element thus forms an integral part of the content. The precise way in which stress is used in this way depends on the language.',
        link: 'https://html.spec.whatwg.org/#the-em-element',
        codepen: '',
      },
      {
        name: 'embed',
        description:
          'Provides an integration point for an external (typically non-HTML) application or interactive content.',
        link: 'https://html.spec.whatwg.org/#the-embed-element',
        codepen: '',
      },
    ],
  },
  {
    label: 'F',
    elements: [
      {
        name: 'fieldset',
        description:
          'Represents a set of form controls (or other content) grouped together, optionally with a caption. The caption is given by the first [legend](#legend) element that is a child of the `fieldset` element, if any. The remainder of the descendants form the group.',
        link: 'https://html.spec.whatwg.org/#the-fieldset-element',
        codepen: '',
      },
      {
        name: 'figcaption',
        description:
          'Represents a caption or legend for the rest of the contents of the figcaption element’s parent figure element, if any.',
        link: 'https://html.spec.whatwg.org/#the-figcaption-element',
        codepen: '',
      },
      {
        name: 'figure',
        description:
          'Represents some flow content, optionally with a caption, that is self-contained (like a complete sentence) and is typically referenced as a single unit from the main flow of the document.',
        link: 'https://html.spec.whatwg.org/#the-figure-element',
        codepen: '',
        froboo: 'https://www.frontendbookmarks.com/html/elements/figure/',
      },
      {
        name: 'footer',
        description:
          'Represents a footer for its nearest ancestor sectioning content or sectioning root element. A footer typically contains information about its section such as who wrote it, links to related documents, copyright data, and the like.',
        link: 'https://html.spec.whatwg.org/#the-footer-element',
        codepen: '',
      },
      {
        name: 'form',
        description:
          'Represents a hyperlink that can be manipulated through a collection of form-associated elements, some of which can represent editable values that can be submitted to a server for processing.',
        link: 'https://html.spec.whatwg.org/#the-form-element',
        codepen: '',
      },
    ],
  },
  {
    label: 'G',
  },
  {
    label: 'H',
    elements: [
      {
        name: 'h1-h6',
        description:
          'Represent headings for their sections. These elements have a rank given by the number in their name. The `h1` element is said to have the highest rank, the `h6` element has the lowest rank, and two elements with the same name have equal rank.',
        link:
          'https://html.spec.whatwg.org/#the-h1,-h2,-h3,-h4,-h5,-and-h6-elements',
        codepen: '',
        froboo: 'https://www.frontendbookmarks.com/html/elements/h1-h6/',
      },
      {
        name: 'head',
        description: 'Represents a collection of metadata for the document.',
        link: 'https://html.spec.whatwg.org/#the-head-element',
        codepen: '',
      },
      {
        name: 'header',
        description: 'Represents a group of introductory or navigational aids.',
        link: 'https://html.spec.whatwg.org/#the-header-element',
        codepen: '',
      },
      {
        name: 'hr',
        description:
          'Represents a paragraph-level thematic break, e.g. a scene change in a story, or a transition to another topic within a section of a reference book.',
        link: 'https://html.spec.whatwg.org/#the-hr-element',
        codepen: '',
      },
      {
        name: 'html',
        description:
          'Represents the root of an HTML document. Authors are encouraged to specify a `lang` attribute on the root html element, giving the document’s language.',
        link: 'https://html.spec.whatwg.org/#the-html-element',
        codepen: '',
      },
    ],
  },
  {
    label: 'I',
    elements: [
      {
        name: 'i',
        description:
          'Represents a span of text in an alternate voice or mood, or otherwise offset from the normal prose in a manner indicating a different quality of text, such as a taxonomic designation, a technical term, an idiomatic phrase from another language, transliteration, a thought, or a ship name in Western texts.',
        link: 'https://html.spec.whatwg.org/#the-i-element',
        codepen: '',
      },
      {
        name: 'iframe',
        description:
          'Represents its nested browsing context. The `src` attribute gives the URL of a page that the element’s nested browsing context is to contain',
        link: 'https://html.spec.whatwg.org/#the-iframe-element',
        codepen: '',
      },
      {
        name: 'img',
        description: 'Represents an image.',
        link: 'https://html.spec.whatwg.org/#the-img-element',
        codepen: '',
      },
      {
        name: 'input',
        description:
          'Represents a typed data field, usually with a form control to allow the user to edit the data. The `type` attribute controls the data type (and associated control) of the element.',
        link: 'https://html.spec.whatwg.org/#the-input-element',
        codepen: '',
      },
      {
        name: 'ins',
        description: 'Represents an addition to the document.',
        link: 'https://html.spec.whatwg.org/#the-ins-element',
        codepen: '',
      },
    ],
  },
  {
    label: 'J',
  },
  {
    label: 'K',
    elements: [
      {
        name: 'kbd',
        description:
          'Represents user input (typically keyboard input, although it may also be used to represent other input, such as voice commands).',
        link: 'https://html.spec.whatwg.org/#the-kbd-element',
        codepen: '',
      },
    ],
  },
  {
    label: 'L',
    elements: [
      {
        name: 'label',
        description:
          'Represents a caption in a user interface. The caption can be associated with a specific form control, known as the `label` element‘s labeled control, either using the `for` attribute, or by putting the form control inside the `label` element itself.',
        link: 'https://html.spec.whatwg.org/#the-label-element',
        codepen: '',
      },
      {
        name: 'legend',
        description:
          'Represents a caption for the rest of the contents of the `legend` element’s parent `fieldset` element, if any.',
        link: 'https://html.spec.whatwg.org/#the-legend-element',
        codepen: '',
      },
      {
        name: 'li',
        description:
          'Represents a list item. If its parent element is an `ol`, `ul`, or `menu` element, then the element is an item of the parent element’s list, as defined for those elements. Otherwise, the list item has no defined list-related relationship to any other `li` element.',
        link: 'https://html.spec.whatwg.org/#the-li-element',
        codepen: '',
      },
      {
        name: 'link',
        description:
          'Allows authors to link their document to other resources.',
        link: 'https://html.spec.whatwg.org/#the-link-element',
        codepen: '',
      },
    ],
  },
  {
    label: 'M',
    elements: [
      {
        name: 'main',
        description: 'Represents the dominant contents of the document.',
        link: 'https://html.spec.whatwg.org/#the-main-element',
        codepen: '',
      },
      {
        name: 'map',
        description:
          'The `map` element, in conjunction with an `img` element and any `area` element descendants, defines an image map. The element represents its children.',
        link: 'https://html.spec.whatwg.org/#the-map-element',
        codepen: '',
      },
      {
        name: 'mark',
        description:
          'Represents a run of text in one document marked or highlighted for reference purposes, due to its relevance in another context. When used in a quotation or other block of text referred to from the prose, it indicates a highlight that was not originally present but which has been added to bring the reader’s attention to a part of the text that might not have been considered important by the original author when the block was originally written, but which is now under previously unexpected scrutiny. When used in the main prose of a document, it indicates a part of the document that has been highlighted due to its likely relevance to the user’s current activity.',
        link: 'https://html.spec.whatwg.org/#the-mark-element',
        codepen: '',
      },
      {
        name: 'menu',
        description:
          'Represents a list of items, where the order of the items is not important — that is, where changing the order would not materially change the meaning of the document.',
        link: 'https://html.spec.whatwg.org/#the-menu-element',
        codepen: '',
      },
      {
        name: 'meta',
        description:
          'Represents various kinds of metadata that cannot be expressed using the `title`, `base`, `link`, `style`, and `script` elements.',
        link: 'https://html.spec.whatwg.org/#the-meta-element',
        codepen: '',
      },
      {
        name: 'meter',
        description:
          ' represents a scalar measurement within a known range, or a fractional value; for example disk usage, the relevance of a query result, or the fraction of a voting population to have selected a particular candidate.',
        link: 'https://html.spec.whatwg.org/#the-meter-element',
        codepen: '',
        froboo: 'https://www.frontendbookmarks.com/html/elements/meter/',
      },
    ],
  },
  {
    label: 'N',
    elements: [
      {
        name: 'nav',
        description:
          'Represents a section of a page that links to other pages or to parts within the page: a section with navigation links.',
        link: 'https://html.spec.whatwg.org/#the-nav-element',
        codepen: '',
        froboo: 'https://www.frontendbookmarks.com/html/elements/nav/',
      },
      {
        name: 'noscript',
        description:
          'Represents nothing if scripting is enabled, and represents its children if scripting is disabled. It is used to present different markup to user agents that support scripting and those that don’t support scripting, by affecting how the document is parsed.',
        link: 'https://html.spec.whatwg.org/#the-noscript-element',
        codepen: '',
      },
    ],
  },
  {
    label: 'O',
    elements: [
      {
        name: 'object',
        description:
          'Can represent an external resource, which, depending on the type of the resource, will either be treated as an image, as a child browsing context, or as an external resource to be processed by a plugin.',
        link: 'https://html.spec.whatwg.org/#the-object-element',
        codepen: '',
      },
      {
        name: 'ol',
        description:
          'Represents a list of items, where the items have been intentionally ordered, such that changing the order would change the meaning of the document.',
        link: 'https://html.spec.whatwg.org/#the-ol-element',
        codepen: '',
      },
      {
        name: 'optgroup',
        description:
          'Represents a group of `option` elements with a common label.',
        link: 'https://html.spec.whatwg.org/#the-optgroup-element',
        codepen: '',
      },
      {
        name: 'option',
        description:
          'Represents an option in a select element or as part of a list of suggestions in a datalist element.',
        link: 'https://html.spec.whatwg.org/#the-option-element',
        codepen: '',
      },
      {
        name: 'output',
        description:
          'Represents the result of a calculation performed by the application, or the result of a user action.',
        link: 'https://html.spec.whatwg.org/#the-output-element',
        codepen: '',
      },
    ],
  },
  {
    label: 'P',
    elements: [
      {
        name: 'p',
        description: 'Represents a paragraph.',
        link: 'https://html.spec.whatwg.org/#the-p-element',
        codepen: '',
      },
      {
        name: 'param',
        description:
          'Defines parameters for plugins invoked by [object](#object) elements. It does not represent anything on its own. The `name` attribute gives the name of the parameter. The `value` attribute gives the value of the parameter.',
        link: 'https://html.spec.whatwg.org/#the-p-element',
        codepen: '',
      },
      {
        name: 'picture',
        description:
          'The `picture` element is a container which provides multiple sources to its contained `img` element to allow authors to declaratively control or give hints to the user agent about which image resource to use, based on the screen pixel density, viewport size, image format, and other factors. It represents its children.',
        link: 'https://html.spec.whatwg.org/#the-picture-element',
        codepen: '',
      },
      {
        name: 'pre',
        description:
          'Represents a block of preformatted text, in which structure is represented by typographic conventions rather than by elements.',
        link: 'https://html.spec.whatwg.org/#the-pre-element',
        codepen: '',
      },
      {
        name: 'progress',
        description:
          'Represents the completion progress of a task. The progress is either indeterminate, indicating that progress is being made but that it is not clear how much more work remains to be done before the task is complete (e.g. because the task is waiting for a remote host to respond), or the progress is a number in the range zero to a maximum, giving the fraction of work that has so far been completed.',
        link: 'https://html.spec.whatwg.org/#the-progress-element',
        codepen: '',
        froboo: 'https://www.frontendbookmarks.com/html/elements/progress/',
      },
    ],
  },
  {
    label: 'Q',
    elements: [
      {
        name: 'q',
        description:
          'Represents some phrasing content quoted from another source. Content inside a `q` element must be quoted from another source, whose address, if it has one, may be cited in the `cite` attribute. The source may be fictional, as when quoting characters in a novel or screenplay.\n\nIf the `cite` attribute is present, it must be a valid URL potentially surrounded by spaces.',
        link: 'https://html.spec.whatwg.org/#the-q-element',
      },
    ],
  },
  {
    label: 'R',
    elements: [
      {
        name: 'rp',
        description:
          'Can be used to provide parentheses or other content around a ruby text component of a ruby annotation, to be shown by user agents that don’t support ruby annotations',
        link: 'https://html.spec.whatwg.org/#the-rp-element',
      },
      {
        name: 'rt',
        description:
          'Marks the ruby text component of a ruby annotation. When it is the child of a `ruby` element, it doesn’t represent anything itself, but the `ruby` element uses it as part of determining what it represents.',
        link: 'https://html.spec.whatwg.org/#the-rt-element',
      },
      {
        name: 'ruby',
        description:
          'Allows one or more spans of phrasing content to be marked with ruby annotations. Ruby annotations are short runs of text presented alongside base text, primarily used in East Asian typography as a guide for pronunciation or to include other annotations. In Japanese, this form of typography is also known as furigana.',
        link: 'https://html.spec.whatwg.org/#the-ruby-element',
        codepen: 'wvzperr',
      },
    ],
  },
  {
    label: 'S',
    elements: [
      {
        name: 's',
        description:
          'Represents contents that are no longer accurate or no longer relevant.',
        link: 'https://html.spec.whatwg.org/#the-s-element',
        codepen: '',
      },
      {
        name: 'samp',
        description:
          'Represents sample or quoted output from another program or computing system.',
        link: 'https://html.spec.whatwg.org/#the-samp-element',
        codepen: '',
      },
      {
        name: 'script',
        description:
          'Allows authors to include dynamic script and data blocks in their documents. The element does not represent content for the user.',
        link: 'https://html.spec.whatwg.org/#the-script-element',
        codepen: '',
      },
      {
        name: 'section',
        description:
          'Represents a generic section of a document or application. A section, in this context, is a thematic grouping of content, typically with a heading.',
        link: 'https://html.spec.whatwg.org/#the-section-element',
        codepen: '',
        froboo: 'https://www.frontendbookmarks.com/html/elements/section/',
      },
      {
        name: 'select',
        description:
          'Represents a control for selecting amongst a set of options.',
        link: 'https://html.spec.whatwg.org/#the-select-element',
        codepen: '',
        froboo: 'https://www.frontendbookmarks.com/html/elements/select/',
      },
      {
        name: 'small',
        description: 'Represents side comments such as small print.',
        link: 'https://html.spec.whatwg.org/#the-small-element',
        codepen: '',
      },
      {
        name: 'source',
        description:
          'Allows authors to specify multiple alternative source sets for `img` elements or multiple alternative media resources for media elements. It does not represent anything on its own.\n\nThe `type` attribute may be present. If present, the value must be a valid MIME type string.',
        link: 'https://html.spec.whatwg.org/#the-source-element',
        codepen: '',
      },
      {
        name: 'span',
        description:
          'The element doesn’t mean anything on its own, but can be useful when used together with the global attributes, e.g. `class`, `lang`, or `dir`. It represents its children.',
        link: 'https://html.spec.whatwg.org/#the-span-element',
        codepen: '',
      },
      {
        name: 'strong',
        description:
          'Represents strong importance, seriousness, or urgency for its contents.',
        link: 'https://html.spec.whatwg.org/#the-strong-element',
        codepen: '',
      },
      {
        name: 'style',
        description:
          'Allows authors to embed CSS style sheets in their documents.',
        link: 'https://html.spec.whatwg.org/#the-style-element',
        codepen: '',
      },
      {
        name: 'sub',
        description:
          'Represents a subscript. These elements must be used only to mark up typographical conventions with specific meanings, not for typographical presentation for presentation’s sake.',
        link: 'https://html.spec.whatwg.org/#the-sub-and-sup-elements',
        codepen: '',
      },
      {
        name: 'summary',
        description:
          'Represents a summary, caption, or legend for the rest of the contents of the `summary` element’s parent `details` element, if any.',
        link: 'https://html.spec.whatwg.org/#the-summary-elements',
        codepen: '',
      },
      {
        name: 'sup',
        description:
          'Represents a superscript. These elements must be used only to mark up typographical conventions with specific meanings, not for typographical presentation for presentation’s sake.',
        link: 'https://html.spec.whatwg.org/#the-sub-and-sup-elements',
        codepen: '',
      },
    ],
  },
  {
    label: 'T',
    elements: [
      {
        name: 'table',
        description:
          'Represents data with more than one dimension, in the form of a table.',
        link: 'https://html.spec.whatwg.org/#the-table-element',
        codepen: '',
      },
      {
        name: 'tbody',
        description:
          'Represents a block of rows that consist of a body of data for the parent `table` element, if the `tbody` element has a parent and it is a `table`.',
        link: 'https://html.spec.whatwg.org/#the-tbody-element',
        codepen: '',
      },
      {
        name: 'td',
        description: 'Represents a data cell in a table.',
        link: 'https://html.spec.whatwg.org/#the-td-element',
        codepen: '',
      },
      {
        name: 'textarea',
        description:
          'Represents a multiline plain text edit control for the element’s raw value. The contents of the control represent the control’s default value.',
        link: 'https://html.spec.whatwg.org/#the-textarea-element',
        codepen: '',
      },
      {
        name: 'tfoot',
        description:
          'Represents the block of rows that consist of the column summaries (footers) for the parent `table` element, if the `tfoot` element has a parent and it is a `table`.',
        link: 'https://html.spec.whatwg.org/#the-tfoot-element',
        codepen: '',
      },
      {
        name: 'th',
        description: 'Represents a header cell in a table.',
        link: 'https://html.spec.whatwg.org/#the-th-element',
        codepen: '',
      },
      {
        name: 'thead',
        description:
          'Represents the block of rows that consist of the column labels (headers) for the parent `table` element, if the `thead` element has a parent and it is a `table`.',
        link: 'https://html.spec.whatwg.org/#the-thead-element',
        codepen: '',
      },
      {
        name: 'title',
        description:
          'Represents the document‘s title or name. Authors should use titles that identify their documents even when they are used out of context, for example in a user‘s history or bookmarks, or in search results. The document‘s title is often different from its first heading, since the first heading does not have to stand alone when taken out of context.\n\nThere must be no more than one `title` element per document.',
        link: 'https://html.spec.whatwg.org/#the-title-element',
        codepen: '',
      },
      {
        name: 'time',
        description:
          'Represents its contents, along with a machine-readable form of those contents in the `datetime` attribute. The kind of content is limited to various kinds of dates, times, time-zone offsets, and durations, as described below.',
        link: 'https://html.spec.whatwg.org/#the-time-element',
        codepen: '',
      },
      {
        name: 'tr',
        description: 'Represents a row of cells in a table.',
        link: 'https://html.spec.whatwg.org/#the-tr-element',
        codepen: '',
      },
      {
        name: 'track',
        description:
          'Allows authors to specify explicit external timed text tracks for media elements. It does not represent anything on its own.',
        link: 'https://html.spec.whatwg.org/#the-track-element',
        codepen: '',
      },
    ],
  },
  {
    label: 'U',
    elements: [
      {
        name: 'u',
        description:
          'Represents a span of text in an alternate voice or mood, or otherwise offset from the normal prose in a manner indicating a different quality of text, such as a taxonomic designation, a technical term, an idiomatic phrase from another language, transliteration, a thought, or a ship name in Western texts.',
        link: 'https://html.spec.whatwg.org/#the-u-element',
        codepen: '',
      },
      {
        name: 'ul',
        description:
          'Represents a list of items, where the order of the items is not important — that is, where changing the order would not materially change the meaning of the document.',
        link: 'https://html.spec.whatwg.org/#the-ul-element',
        codepen: '',
      },
    ],
  },
  {
    label: 'V',
    elements: [
      {
        name: 'var',
        description:
          'Represents a variable. This could be an actual variable in a mathematical expression or programming context, an identifier representing a constant, a symbol identifying a physical quantity, a function parameter, or just be a term used as a placeholder in prose.',
        link: 'https://html.spec.whatwg.org/#the-var-element',
        codepen: '',
      },
      {
        name: 'video',
        description:
          'Is used for playing videos or movies, and audio files with captions.',
        link: 'https://html.spec.whatwg.org/#the-video-element',
        codepen: '',
        froboo: 'https://www.frontendbookmarks.com/html/elements/video/',
      },
    ],
  },
  {
    label: 'W',
    elements: [
      {
        name: 'wbr',
        description: 'Represents a line break opportunity.',
        link: 'https://html.spec.whatwg.org/#the-wbr-element',
        codepen: '',
      },
    ],
  },
  {
    label: 'X',
  },
  {
    label: 'Y',
  },
  {
    label: 'Z',
  },
];
