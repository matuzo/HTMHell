---
title: "#12 accessible poll yes/no"
date: 2019-12-03T16:00:00
author: erik
permalink: /{{ title | slug }}/index.html
badcode: '<form role="form">
  <h2>Poll title</h2>
  <div id="pollQuestion">Is this accessible?</div>
  <div name="pollGroup" role="radiogroup">
    <div role="radiogroup" aria-label="Poll title">
      <input type="radio" name="poll" aria-labelledby="pollQuestion" value="[object Object]">
      <span>Yes</span>     


      <input type="radio" name="poll" aria-labelledby="pollQuestion" value="[object Object]">
      <span>No</span>   


      <input type="radio" name="poll" aria-labelledby="pollQuestion" value="[object Object]">
      <span>Maybe</span>
      

      <input type="radio" name="poll" aria-labelledby="pollQuestion" value="[object Object]">
      <span>Can you repeat the question?</span>      
    </div>


    <button type="submit">Vote</button>
  </div>
</form>'

goodcode: '<form aria-labelledby="poll-title">
  <h2 id="poll-title">Poll title</h2>
  <fieldset>
    <legend>Is this accessible?</legend>


    <input type="radio" id="radio1" name="poll" value="yes">
    <label for="radio1">Yes</label>


    <input type="radio" id="radio2" name="poll" value="no">
    <label for="radio2">No</label>


    <input type="radio" id="radio3" name="poll" value="maybe">
    <label for="radio3">Maybe</label>


    <input type="radio" id="radio4" name="poll" value="repeat">
    <label for="radio4">Can you repeat the question?</label>  


    <button type="submit">Vote</button>
  </fieldset>
</form>'

---

<div class="section bad">

## Bad code

```html
{{ badcode | pretty }}
```
</div>

<div class="section" id="issues">

## Issues and how to fix them

1. Setting form semantics explicitly using the `role` attribute isn’t necessary, the semantics are implied in the element.
1. A form is a landmark. An `aria-labelledby` referring to the `h2` gives the landmark an accessible name. This makes it more useful for navigation.
1. Setting `role="radiogroup"` isn’t necessary, and certainly not twice. If you want to group the element, use a `fieldset` instead.
1. Don’t use `aria-labelledby` to create a relationship between a `radiobutton` and the poll question. `aria-labelledby` is for setting the accessible name. Use a `legend` instead.
1. To give `radiobutton` an accessible name, put the `span` content in a `label`, and use `for` to create a relationship with the `radiobutton`.
1. The button is inside the fieldset to create one logical grouping.

</div>

<div class="section">

## Good code

```html
{{ goodcode | pretty }}
```
</div>


