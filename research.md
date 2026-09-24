---
layout: page
title: Research
eyebrow: What I work on
subtitle: "How the brain learns the structure of the world"
permalink: /research/
width: 1120px
---

<p class="lede">My research asks how humans (and in particular babies) build internal models of structured environments: from infants discovering the regularities of their mother tongue, to adults accumulating evidence towards a decision, to the temporal structure that shapes what we perceive. I approach these questions along three complementary strands.</p>

<ul class="strand-index">
{% for s in site.data.research %}
  <li><a href="#{{ s.id }}"><span class="n">{{ forloop.index | prepend: '0' | slice: -2, 2 }}</span>{{ s.title }}</a></li>
{% endfor %}
</ul>

{% for s in site.data.research %}
<section class="strand" id="{{ s.id }}">
  <div class="strand__head" data-reveal>
    <p class="strand__n">Strand {{ forloop.index | prepend: '0' | slice: -2, 2 }}</p>
    <h2 class="strand__title">{{ s.title }}</h2>
    <p class="strand__short">{{ s.short }}</p>
  </div>

  <figure class="plate" data-reveal style="--d:.06s">
    <div class="plate__img">
      <img src="{{ s.figure | relative_url }}" alt="{{ s.alt }}" loading="lazy">
    </div>
    <figcaption>{{ s.caption }}</figcaption>
  </figure>

  <div class="strand__body" data-reveal style="--d:.1s">
    {{ s.body }}
  </div>
</section>
{% endfor %}

<section class="strand" id="methods">
  <div class="strand__head" data-reveal>
    <p class="strand__n">Toolkit</p>
    <h2 class="strand__title">Methods</h2>
    <p class="strand__short">Measuring the signal, then explaining it with a model that could have produced it.</p>
  </div>

  <ul class="method-grid" data-reveal style="--d:.06s">
    <li><strong>Behaviour</strong><span>Psychophysics and sequence-learning tasks in adults, infants and patients.</span></li>
    <li><strong>EEG · MEG · iEEG</strong><span>High-density recordings, including neonatal EEG and intracranial recordings in epileptic patients.</span></li>
    <li><strong>MRI · fMRI</strong><span>Anatomical morphometry of the neonatal brain and task-based functional imaging.</span></li>
    <li><strong>Computational models</strong><span>Mathematical accounts of behaviour, Bayesian observers, recurrent neural networks.</span></li>
  </ul>
</section>

<section class="strand" id="background">
  <div class="strand__head" data-reveal>
    <p class="strand__n">Path</p>
    <h2 class="strand__title">Background</h2>
    <p class="strand__short">From signal processing and bio-engineering to the developing brain.</p>
  </div>

  <ul class="cv-line" data-reveal style="--d:.06s">
    <li>
      <span class="cv-line__year">2024 →</span>
      <span class="cv-line__what"><strong>Postdoctoral researcher</strong>
      <span>INS, Aix-Marseille Université (B. Morillon) and LNC², ENS-PSL (V. Wyart). Funded by the Fondation pour la Recherche Médicale.</span></span>
    </li>
    <li>
      <span class="cv-line__year">2023</span>
      <span class="cv-line__what"><strong>PhD in cognitive neuroscience</strong>
      <span>NeuroSpin (CEA &amp; Sorbonne Université), supervised by Ghislaine Dehaene-Lambertz, on learning temporal dependencies in auditory sequences, in adults and neonates.</span></span>
    </li>
    <li>
      <span class="cv-line__year">2018–2019</span>
      <span class="cv-line__what"><strong>Research visits</strong>
      <span>University College London (M. Chait, auditory salience and pupillometry) and the Montreal Neurological Institute, McGill (R. Zatorre, P. Albouy, B. Morillon, speech and music processing).</span></span>
    </li>
    <li>
      <span class="cv-line__year">2015–2019</span>
      <span class="cv-line__what"><strong>Engineering MSc &amp; MSc in computational biology</strong>
      <span>CentraleSupélec, major in bio-engineering and signal processing, with a parallel MSc at Université Paris-Saclay.</span></span>
    </li>
  </ul>
</section>