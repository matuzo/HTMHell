---
layout: layouts/base.njk
---
# HTMHell Advent Calendar Day {{ date | dayDate }}

{{ content | safe }}

**[{{ title }}]({{ url }})** by [{{ author }}]({{ author_web }})

{% assign nextPost = collections.advent2021 | getNextCollectionItem: page %}
{% assign prevPost = collections.advent2021 | getPreviousCollectionItem: page %}

{% if nextPost %} [Go to the next day (door {{ nextPost.data.date | dayDate }})]({{ nextPost.url }}) 
or {% endif %}{% if prevPost %} [go to the previous day (door {{ prevPost.data.date | dayDate }})]({{ prevPost.url }}) 
or {% endif %}[go back to the calendar](/adventcalendar)

