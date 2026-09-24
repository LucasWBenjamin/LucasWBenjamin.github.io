---
layout: page
title: Publications
eyebrow: Peer-reviewed work
subtitle: Journal articles and preprints, most recent first.
permalink: /publications/
width: 1000px
---

{% assign pubs = site.data.publications %}
{% assign n_total = pubs.size %}

<div class="pub-toolbar">
  <div class="pub-profiles">
    <a href="{{ site.scholar }}" target="_blank" rel="noopener">Google Scholar &#8599;</a>
    <a href="https://orcid.org/{{ site.orcid }}" target="_blank" rel="noopener">ORCID &#8599;</a>
  </div>
</div>

{% assign featured = pubs | where: "featured", true | sort: "year" | reverse %}
{% if featured.size > 0 %}
<h2 class="section-heading">Selected <span class="count">{{ featured.size }} papers</span></h2>
<div class="featured-grid">
  {% for p in featured %}{% include pub-card.html p=p delay=forloop.index0 %}{% endfor %}
</div>
{% endif %}

<h2 class="section-heading">All publications <span class="count">{{ n_total }} total</span></h2>

<div class="filter-bars">

<div class="filter-bar" data-filter-group="topics">
  <span class="filter-bar__label">Topic</span>
  <button class="chip" type="button" data-filter="all" aria-pressed="true">All <b>{{ n_total }}</b></button>
  {% for t in site.data.topics %}
    {% assign n = 0 %}
    {% for p in pubs %}{% if p.topics contains t.key %}{% assign n = n | plus: 1 %}{% endif %}{% endfor %}
    {% if n > 0 %}
    <button class="chip" type="button" data-filter="{{ t.key }}" aria-pressed="false">{{ t.label }} <b>{{ n }}</b></button>
    {% endif %}
  {% endfor %}
</div>

<div class="filter-bar filter-bar--second" data-filter-group="populations">
  <span class="filter-bar__label">Population</span>
  <button class="chip" type="button" data-filter="all" aria-pressed="true">All <b>{{ n_total }}</b></button>
  {% for g in site.data.populations %}
    {% assign n = 0 %}
    {% for p in pubs %}{% if p.populations contains g.key %}{% assign n = n | plus: 1 %}{% endif %}{% endfor %}
    {% if n > 0 %}
    <button class="chip" type="button" data-filter="{{ g.key }}" aria-pressed="false">{{ g.label }} <b>{{ n }}</b></button>
    {% endif %}
  {% endfor %}
</div>

</div>

{% assign sorted = pubs | sort: "year" | reverse %}
{% assign year_list = sorted | map: "year" | uniq %}

{% for y in year_list %}
<section class="pub-year-group" data-year-group>
  <div class="pub-year-group__head">
    <span class="pub-year-group__year">{{ y }}</span>
  </div>

  <ul class="pub-list">
  {% for p in sorted %}{% if p.year == y %}
    {% assign doi_url = p.doi | prepend: 'https://doi.org/' %}
    {% if p.pdf %}{% assign main = p.pdf | relative_url %}
    {% elsif p.link %}{% assign main = p.link %}
    {% else %}{% assign main = doi_url %}{% endif %}
    <li class="pub-item" data-topics="{{ p.topics | join: ' ' }}" data-populations="{{ p.populations | join: ' ' }}">
      <div class="pub-logo-wrap">
        {% if p.logo %}
        <img src="{{ '/pages/publications/logo/' | append: p.logo | relative_url }}"
             alt="{{ p.venue }}" class="pub-logo" loading="lazy">
        {% endif %}
      </div>

      <div class="pub-content">
        <h3 class="pub-title">
          <a href="{{ main }}" target="_blank" rel="noopener">{{ p.title }}</a>
        </h3>

        <p class="pub-authors">
          {% for a in p.authors %}{% if a contains "Benjamin" %}<span class="me">{{ a }}</span>{% else %}{{ a }}{% endif %}{% unless forloop.last %}, {% endunless %}{% endfor %}
        </p>

        <div class="pub-meta">
          <span class="pub-venue">{{ p.venue }}</span>
          <span class="pub-year">{{ p.year }}</span>
          {% for k in p.topics %}
            {% assign t = site.data.topics | where: "key", k | first %}
            {% if t %}<span class="pub-topic">{{ t.label }}</span>{% endif %}
          {% endfor %}
          {% for k in p.populations %}
            {% assign g = site.data.populations | where: "key", k | first %}
            {% if g %}<span class="pub-topic pub-topic--pop">{{ g.label }}</span>{% endif %}
          {% endfor %}
          <span class="pub-links">
            {% if p.pdf %}<a href="{{ p.pdf | relative_url }}" target="_blank" rel="noopener" class="pub-link pub-link--pdf">PDF</a>{% endif %}
            {% if p.link %}<a href="{{ p.link }}" target="_blank" rel="noopener" class="pub-link">Journal ↗</a>
            {% elsif p.doi %}<a href="{{ doi_url }}" target="_blank" rel="noopener" class="pub-link">Journal ↗</a>{% endif %}
          </span>
        </div>
      </div>
    </li>
  {% endif %}{% endfor %}
  </ul>
</section>
{% endfor %}

<p class="filter-empty" data-filter-empty hidden>No publication matches this topic yet.</p>

<p class="pub-note">* denotes authors who contributed equally. Topic and population labels are my own grouping.</p>
