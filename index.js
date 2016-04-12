'use strict';

var assign = require('object-assign');

// Use the configuration below to provide defaults.
// The user can override the defaults from the _config.yaml file.
hexo.config.feed = assign({
    format: 'rss2',
    limit: 20
}, hexo.config.feed);

// Register the generator with hexo.
hexo.extend.generator.register('category-feed', require('./lib/generator'));