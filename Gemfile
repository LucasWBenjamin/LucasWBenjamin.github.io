source "https://rubygems.org"

# --- Local development ---
# GitHub Pages builds the site remotely with its own pinned gems, so the
# Gemfile is only used for local preview. Use Jekyll 4 locally for compat
# with modern Ruby (3.2+).
gem "jekyll", "~> 4.3"

group :jekyll_plugins do
  gem "jekyll-feed"
  gem "jekyll-seo-tag"
  gem "jekyll-sitemap"
end

# Stdlib gems no longer bundled with Ruby 3.4+
gem "csv"
gem "webrick"
gem "base64"
gem "logger"
gem "bigdecimal"

# Windows / JRuby tzinfo support
install_if -> { RUBY_PLATFORM =~ %r!mingw|mswin|java! } do
  gem "tzinfo", "~> 1.2"
  gem "tzinfo-data"
end

gem "wdm", "~> 0.1.1", :install_if => Gem.win_platform?
