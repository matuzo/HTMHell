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

## More articles

{% assign nextPost = collections.advent2022 | getNextCollectionItem: page %}
{% assign prevPost = collections.advent2022 | getPreviousCollectionItem: page %}

{% if nextPost %} [Read the next article (day {{ nextPost.data.date | dayDate }})]({{ nextPost.url }}) 
or {% endif %}{% if prevPost %} [Read the previous article (day {{ prevPost.data.date | dayDate }})]({{ prevPost.url }}) 
or {% endif %}[go back to the calendar](/adventcalendar)

