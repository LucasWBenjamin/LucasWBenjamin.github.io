---
layout: page
title: Teaching & Service
eyebrow: ""
subtitle: Teaching, student supervision, organisation, reviewing and outreach.
permalink: /teaching/
---

{% assign d = site.data.teaching %}

<section class="teach-section">
  <h2 class="section-heading">Teaching</h2>
  <ul class="teach-list">
  {% for t in d.teaching %}
    <li data-reveal>
      <span class="teach-year">{{ t.year }}</span>
      <div>
        <strong>{{ t.title }}</strong>
        <span class="teach-meta">{{ t.detail }}</span>
      </div>
    </li>
  {% endfor %}
  </ul>
</section>

<section class="teach-section">
  <h2 class="section-heading">Student supervision <span class="count">{{ d.supervision.size }} students</span></h2>
  <ul class="teach-list">
  {% for s in d.supervision %}
    <li data-reveal>
      <span class="teach-year">{{ s.year }}</span>
      <div>
        <strong>{{ s.title }}</strong>
        <span class="teach-meta">{{ s.detail }}</span>
      </div>
    </li>
  {% endfor %}
  </ul>
</section>

<section class="teach-section">
  <h2 class="section-heading">Awards & funding</h2>
  <div class="award-grid">
  {% for a in d.awards %}
    <div class="award" data-reveal style="--d:{{ forloop.index0 | times: 70 }}ms">
      {% if a.amount %}<p class="award__amount">{{ a.amount }}</p>{% endif %}
      <p class="award__title">{{ a.title }}</p>
      <p class="award__who">{{ a.funder }}</p>
      <p class="award__year">{{ a.year }}</p>
    </div>
  {% endfor %}
  </div>
</section>

<section class="teach-section">
  <h2 class="section-heading">Conference organisation</h2>
  <ul class="teach-list">
  {% for o in d.organization %}
    <li data-reveal>
      <span class="teach-year">{{ o.year }}</span>
      <div>
        <strong>{{ o.title }}</strong>
        <span class="teach-meta">{{ o.detail }}</span>
      </div>
    </li>
  {% endfor %}
  </ul>
</section>

<section class="teach-section">
  <h2 class="section-heading">Reviewing</h2>

  <div class="review-block">
    <p class="review-block__label">Journals</p>
    {% assign journals = d.reviewing.journals | replace: ".", "" | split: ", " %}
    <ul class="review-list">
    {% for j in journals %}<li>{{ j | strip }}</li>{% endfor %}
    </ul>
  </div>

  {% if d.reviewing.grants and d.reviewing.grants.size > 0 %}
  <div class="review-block">
    <p class="review-block__label">Grants</p>
    <ul class="review-list">
    {% for g in d.reviewing.grants %}<li>{{ g }}</li>{% endfor %}
    </ul>
  </div>
  {% endif %}
</section>

<section class="teach-section">
  <h2 class="section-heading">Outreach</h2>
  <ul class="teach-list">
  {% for o in d.outreach %}
    <li data-reveal>
      <span class="teach-year">{{ o.year }}</span>
      <div>
        <strong>{{ o.title }}</strong>
        {% if o.detail != "" %}<span class="teach-meta">{{ o.detail }}</span>{% endif %}
      </div>
    </li>
  {% endfor %}
  </ul>
</section>
