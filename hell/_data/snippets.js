module.exports = {
  sr_only: "Unfortunately, there’s no native way of hiding content only visually.<br>The `.sr-only` class makes sure that content is visually hidden but still accessible to screen reader users.",
  native_semantics: "Do not change native semantics, unless you really have to.",
  button_click: "A click event on a `button` triggers on click and if the user presses the <kbd>Enter</kbd> or <kbd>Space</kbd> key.",
  div_click: "A click event on a `div` triggers only on click.",
  span_click: "A click event on a `span` triggers only on click.",
  use_button: "If you need a button, use the `<button>` element.",
  negative_tabindex: "A negative `tabindex` value means that the element is not accessible via keyboard, but it could be focused with Javascript",
  skip_headings: "Heading levels shouldn’t be skipped. Screen reader users rely on a sound document outline and hierarchy. It helps with navigation and understanding how the page is structured.",
  div_semantics: "The `<div>` element is an element of last resort, for when no other element is suitable. Use of the `<div>` element instead of more appropriate elements leads to poor accessibility.",
  dom_size: "Try to avoid excessive <abbr title='Document Object Model'>DOM</abbr> sizes. Too many <abbr title='Document Object Model'>DOM</abbr> nodes and nested <abbr title='Document Object Model'>DOM</abbr> elements may harm your page performance.",
  dom_tree: "A large <abbr title='Document Object Model'>DOM</abbr> tree results in a large accessibility tree, which may have a bad impact on the performance of assistive technology.",
  aplaceholder: "If the `<a>` element has no `href` attribute, then the element represents a placeholder for where a link might otherwise have been placed.",
  aplaceholder_click: "If you're adding a click event to a placeholder link, you probably don't want to use a placeholder link, but an actual link with an `href` attribute or a `<button>`, depending on what's happening on click."
}
