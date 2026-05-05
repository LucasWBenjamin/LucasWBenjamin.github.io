---
layout: page
title: Teaching & Service
subtitle: Teaching, student supervision, organisation, reviewing, outreach
permalink: /teaching/
---

## Teaching

<div class="teach-block">
<ul>
{% for t in site.data.teaching.teaching %}
  <li>
    <span class="teach-year">{{ t.year }}</span>
    <div>
      <strong>{{ t.title }}</strong>
      <span class="teach-meta">{{ t.detail }}</span>
    </div>
  </li>
{% endfor %}
</ul>
</div>

## Student Supervision

<div class="teach-block">
<ul>
{% for s in site.data.teaching.supervision %}
  <li>
    <span class="teach-year">{{ s.year }}</span>
    <div>
      <strong>{{ s.title }}</strong>
      <span class="teach-meta">{{ s.detail }}</span>
    </div>
  </li>
{% endfor %}
</ul>
</div>

## Conference Organisation

<div class="teach-block">
<ul>
{% for o in site.data.teaching.organization %}
  <li>
    <span class="teach-year">{{ o.year }}</span>
    <div>
      <strong>{{ o.title }}</strong>
      <span class="teach-meta">{{ o.detail }}</span>
    </div>
  </li>
{% endfor %}
</ul>
</div>

## Awards & Funding

<div class="teach-block">
<ul>
{% for a in site.data.teaching.awards %}
  <li>
    <span class="teach-year">{{ a.year }}</span>
    <div>
      <strong>{{ a.title }}</strong>
      <span class="teach-meta">{{ a.detail }}</span>
    </div>
  </li>
{% endfor %}
</ul>
</div>

## Reviewing

<p class="muted">{{ site.data.teaching.reviewing.text }}</p>

## Outreach

<div class="teach-block">
<ul>
{% for o in site.data.teaching.outreach %}
  <li>
    <span class="teach-year">{{ o.year }}</span>
    <div>
      <strong>{{ o.title }}</strong>
      {% if o.detail != "" %}<span class="teach-meta">{{ o.detail }}</span>{% endif %}
    </div>
  </li>
{% endfor %}
</ul>
</div>
