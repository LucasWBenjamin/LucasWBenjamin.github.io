---
layout: page
title: Talks & Conferences
subtitle: Invited talks, contributed talks, and posters
permalink: /talks/
---

<ul class="talks-list">
{% for t in site.data.talks %}
  <li>
    <span class="talk-year">{{ t.year }}</span>
    <div>
      {% assign role_class = t.role | downcase | replace: " ", "-" %}
      <span class="talk-role {% if t.role contains 'Invited' %}invited{% endif %}">{{ t.role }}</span>
      <span class="talk-title">{{ t.title }}</span>
      {% if t.venue %}<span class="talk-venue">{{ t.venue }}</span>{% endif %}
    </div>
  </li>
{% endfor %}
</ul>
