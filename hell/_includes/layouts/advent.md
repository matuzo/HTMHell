---
layout: layouts/base.njk
---
# HTMHell Advent Calendar Day {{ date | dayDate }}

{{ content | safe }}

**[{{ title }}]({{ url }})** by [{{ author }}]({{ author_web }})

{% assign nextPost = collections.advent2021 | getNextCollectionItem: page %}

{% if nextPost %} [See what's behind door {{ nextPost.data.date | dayDate }} ]({{ nextPost.url }}) or {% endif %}[go back to the calendar](/adventcalendar)

