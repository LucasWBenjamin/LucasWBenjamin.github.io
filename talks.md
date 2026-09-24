---
layout: page
title: Talks & Conferences
eyebrow: Where this work has been shown
subtitle: Invited talks, contributed talks and posters.
permalink: /talks/
---

{% assign talks = site.data.talks %}
{% assign years = talks | map: "year" | uniq | sort | reverse %}

{% for y in years %}
<section class="talks-year">
  <div class="talks-year__head">
    <span class="talks-year__n">{{ y }}</span>
  </div>

  <ul class="talks-list">
  {% for t in talks %}{% if t.year == y %}
    <li data-reveal>
      {% assign cls = "" %}
      {% if t.role contains "Invited" %}{% assign cls = "is-invited" %}
      {% elsif t.role contains "Speaker" %}{% assign cls = "is-speaker" %}{% endif %}
      <span class="talk-role {{ cls }}">{{ t.role }}</span>
      <div>
        <span class="talk-title">{{ t.title }}</span>
        {% if t.venue %}<span class="talk-venue">{{ t.venue }}</span>{% endif %}
      </div>
    </li>
  {% endif %}{% endfor %}
  </ul>
</section>
{% endfor %}
