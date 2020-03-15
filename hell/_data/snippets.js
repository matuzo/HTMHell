module.exports = {
  sr_only: "Unfortunately, there’s no native way of hiding content only visually.<br>The `.sr-only` class makes sure that content is visually hidden but still accessible to screen reader users.",
  native_semantics: "Do not change native semantics, unless you really have to.",
  button_click: "A click event on a `button` triggers on click and if the user presses the <kbd>Enter</kbd> or <kbd>Space</kbd> key.",
  div_click: "A click event on a `div` triggers only on click.",
  span_click: "A click event on a `span` triggers only on click.",
  use_button: "If you need a button, use the `<button>` element.",
  negative_tabindex: "A negative `tabindex` value means that the element is not accessible via keyboard, but it could be focused with Javascript",
  skip_headings: "Heading levels shouldn’t be skipped. Screen reader users rely on a sound document outline and hierarchy. It helps with navigation and understanding how the page is structured."
};
