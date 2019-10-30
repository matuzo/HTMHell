---
title: "#7 multiple-duplicated-ids"
date: 2019-10-29
author: dirty-co.de
permalink: /{{ title | slug }}/index.html

badcode: '<!-- maintable -->
<table  style="border:0; padding:0; border-spacing: 0; border-collapse: separate;" id="maintable">
	<tr id="body">
		<td id="body">
			<!-- body -->
			<table border="0" cellpadding="0" cellspacing="0" id="body">
				<tr id="body_row">
					<td id="body_left">
						<div id="body_left">
						</div>
					</td>
					<td id="body_middle">
						<div id="body_middle">
						</div>
					</td>
					<td id="body_right">
						<div id="body_right">
						</div>
					</td>
				</tr>
			</table>
		</td>
	</tr>
</table>'

goodcode: '
<main id="body">
	<aside id="body_left">
	</aside>
	<article id="body_middle">
	</article>
	<aside id="body_right">
	</aside>
</main>'
---

<div class="section bad">

## Bad code

```html
{{ badcode | pretty }}
```

</div>

<div class="section">

## Issues and how to fix them

An `id` should be unique no matter on which tag it's added. Also this code uses a table-based layout (and yeah, it's on a live production site still running, redesigned in 2016). Avoid using tables for layout reasons only, because table elements have a semantic meaning. Using them could make your document more confusing for some people.

1. Replace the current markup with semantic HTML5 tags, which reduces the number of tags and avoids the table-based layout.
2. Style the new elements like before by using Flexbox or CSS Grid.

</div>

<div class="section">

## Good code

```html
{{ goodcode | pretty }}
```

</div>
