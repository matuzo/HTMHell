---
layout: layouts/base.njk
---
# {{ title }}

by [{{ author }}]({{ author_links[0].url }}) published on <time datetime="{{ date | htmlDateString }}">{{ date | readableDate }}</time> 

{{ content | safe }}

## About {{ author }}

{{ author_bio | safe }}

{% for link in author_links %}
  {{ link.label }}: [{{ link.link_label }}]({{ link.url }})   
{%- endfor %}
<!-- 
## More articles

{% assign previousPost = collections.advent2022 | getPreviousCollectionItem: page %}
{% assign nextPost = collections.advent2022 | getNextCollectionItem: page %}

<nav aria-label="Select next or previous entry">
<ol class="page-nav">
{% if previousPost %}
<li class="page-nav__item page-nav__item--prev">
<a class="page-nav__link page-nav__link--prev" href="{{ previousPost.url }}">
<div class="page-nav__label">Previous day ({{ previousPost.data.date | dayDate }})</div>
{{ previousPost.data.title }}
</a>
</li>
{% endif %}

{% if nextPost and nextPost.data.active%}
<li class="page-nav__item page-nav__item--next">
<a class="page-nav__link page-nav__link--next" href="{{ nextPost.url }}">
<div class="page-nav__label">Next day {{ nextPost.data.date | dayDate }}</div>
{{ nextPost.data.title }}
</a>
</li>
{% endif %}
</ol>
</nav> -->
