---
layout: layouts/base.njk
---
<div class="advent">

{% if active or draft %}
# {{ title }}

by [{{ author }}]({{ author_links[0].url }}) published on <time datetime="{{ date | htmlDateString }}">{{ date | readableDate }}</time> 

<a href="#comments" class="skip-link">Skip to comments</a>

{{ content | safe }}

{% if author_bio %}

## About {{ author }}

{{ author_bio | safe }}

{%- endif %}


{% for link in author_links %}
  {{ link.label }}: [{{ link.link_label }}]({{ link.url }})   
{%- endfor %}

<section class="comments" id="comments" aria-labelledby="comments_heading">

  <h2 id="comments_heading">Comments</h2>

  <div class="js-results">
    <p>
      There are no comments yet.
    </p>
  </div>
  
  <h3 id="commentto_heading">Leave a comment</h3>

  <div class="comment-message" id="comment-message"></div>
  
  <form action="https://htmhell.dev/commentapi/" method="POST" id="comment">
    <input type="hidden" name="date" value="{{ date }}">
    <p>
      <label for="name">Name</label>
      <input name="name" id="name" aria-describedby="comment-message">
    </p>
    <p>
      <label for="message">Comment</label>
      <span class="desc" id="desc"><small>HTML is not supported, but you can use Markdown.</small></span>
      <textarea id="message" name="message" rows="5" aria-describedby="comment-message desc"></textarea>
    </p>
    <button>Send</button>
  </form>
</section>

<section class="advent-nav">

{% assign previousPost = collections.advent2025 | getPreviousCollectionItem: page %}
{% assign nextPost = collections.advent2025 | getNextCollectionItem: page %}

{% if previousPost or nextPost.data.active %}

## More articles

<nav aria-label="Select next or previous entry">
<ol class="page-nav">
{% if previousPost %}
<li class="page-nav__item page-nav__item--prev">
<a class="page-nav__link page-nav__link--prev" href="{{ previousPost.url }}" rel="prev">
<div class="page-nav__label">Previous day ({{ previousPost.data.date | dayDate }})</div>
{{ previousPost.data.title }}
</a>
</li>
{% endif %}

{% if nextPost and nextPost.data.active%}
<li class="page-nav__item page-nav__item--next">
<a class="page-nav__link page-nav__link--next" href="{{ nextPost.url }}" rel="next">
<div class="page-nav__label">Next day {{ nextPost.data.date | dayDate }}</div>
{{ nextPost.data.title }}
</a>
</li>
{% endif %}
</ol>
</nav>

{% endif %}


{% endif %}

</section>

</div>


      