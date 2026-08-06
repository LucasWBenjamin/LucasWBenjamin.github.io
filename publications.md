---
layout: page
title: Publications
subtitle: Peer-reviewed articles and preprints
permalink: /publications/
---

<p class="scholar-link">
  Full record on
  <a href="{{ site.scholar }}" target="_blank" rel="noopener">Google Scholar</a>
  &middot;
  <a href="https://orcid.org/{{ site.orcid }}" target="_blank" rel="noopener">ORCID</a>
</p>

{% assign featured = site.data.publications | where: "featured", true | sort: "year" | reverse %}
{% if featured.size > 0 %}
<section class="featured-section">
  <h2 class="section-heading">Selected publications</h2>
  <div class="featured-grid">
    {% for p in featured %}
    {% assign href = "" %}
    {% if p.pdf %}{% assign href = p.pdf | relative_url %}{% elsif p.link %}{% assign href = p.link %}{% elsif p.doi %}{% assign href = 'https://doi.org/' | append: p.doi %}{% endif %}
    <div class="featured-card">
      <a class="featured-card__cover-link" href="{{ href }}" target="_blank" rel="noopener" aria-label="{{ p.title }}, {{ p.venue }} {{ p.year }}"></a>
      <div class="featured-card__logo">
        {% if p.logo %}
          <img src="{{ '/pages/publications/logo/' | append: p.logo | relative_url }}" alt="{{ p.venue }} logo" loading="lazy">
        {% else %}
          <span class="featured-card__venue">{{ p.venue }}</span>
        {% endif %}
      </div>
      {% assign first_author = p.authors | first %}
      {% assign last_name = first_author | split: ' ' | last %}
      <div class="featured-card__meta">
        <span>{{ last_name }}{% if p.authors.size > 1 %} et al.{% endif %}</span>
        <span class="sep">·</span>
        <span>{{ p.year }}</span>
      </div>
      <div class="featured-card__title">{{ p.title | truncate: 110 }}</div>
      {% if p.pdf and p.link %}
      <a class="featured-card__journal" href="{{ p.link }}" target="_blank" rel="noopener">Journal ↗</a>
      {% elsif p.pdf and p.doi %}
      <a class="featured-card__journal" href="https://doi.org/{{ p.doi }}" target="_blank" rel="noopener">Journal ↗</a>
      {% endif %}
    </div>
    {% endfor %}
  </div>
</section>
{% endif %}

<h2 class="section-heading">All publications</h2>

{% assign sorted_pubs = site.data.publications | sort: "year" | reverse %}

<ul class="pub-list">
{% for p in sorted_pubs %}
  <li class="pub-item">
    <div class="pub-logo-wrap">
      {% if p.logo %}
        <img src="{{ '/pages/publications/logo/' | append: p.logo | relative_url }}" alt="{{ p.venue }} logo" class="pub-logo" loading="lazy">
      {% endif %}
    </div>
    <div class="pub-content">
      <div class="pub-title">{{ p.title }}</div>
      <div class="pub-authors">
        {% for a in p.authors %}{% if a contains "Benjamin" %}<span class="me">{{ a }}</span>{% else %}{{ a }}{% endif %}{% unless forloop.last %}, {% endunless %}{% endfor %}
      </div>
      <div class="pub-meta">
        <span class="pub-venue">{{ p.venue }}</span>, <span class="pub-year">{{ p.year }}</span>
        {% if p.tag %}<span class="pub-tag">{{ p.tag }}</span>{% endif %}
        <span class="pub-links">
          {% if p.pdf %}<a href="{{ p.pdf | relative_url }}" target="_blank" rel="noopener" class="pub-link">PDF</a>{% endif %}
          {% if p.link %}<a href="{{ p.link }}" target="_blank" rel="noopener" class="pub-link">Journal ↗</a>{% elsif p.doi %}<a href="https://doi.org/{{ p.doi }}" target="_blank" rel="noopener" class="pub-link">Journal ↗</a>{% endif %}
        </span>
      </div>
    </div>
  </li>
{% endfor %}
</ul>
