---
title: "#7 multiple duplicate ids and table layout"
date: 2019-10-29
author: dirty-co.de
permalink: /{{ title | slug }}/index.html

badcode: '
<table>
	<tr id="body">
		<td id="body">
			<table id="body">
				<tr id="body_row">
					<td id="body_left">…</td>
					<td id="body_middle">…</td>
					<td id="body_right">…</td>
				</tr>
			</table>
		</td>
	</tr>
</table>'

goodcode: '
<main id="body">
	<aside id="secondary_content">
	</aside>
	<article id="primary_content">
	</article>
	<aside id="tertiary_content">
	</aside>
</main>'
---

<div class="section bad">

## Bad code

```html
{{ badcode | pretty }}
```

</div>

<div class="section" id="issues">

## Issues and how to fix them

An `id` should be unique no matter on which tag it’s added. Also this code uses a table-based layout (and yeah, it’s on a live production site still running, redesigned in 2016). Avoid using tables for layout reasons only, because table elements have a semantic meaning. Using them could make your document more confusing for some people.

1. Replace the current markup with semantic HTML5 tags. This reduces the number of tags and avoids the table-based layout.
2. Style the new elements by using [Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox) or [CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout).
3. For the ID values, more semantic terms should be used.

</div>

<div class="section">

## Good code

```html
{{ goodcode | pretty }}
```

</div>
