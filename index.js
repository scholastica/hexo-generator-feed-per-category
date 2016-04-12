'use strict';

var assign = require('object-assign');

// Use the configuration below to provide defaults.
// The user can override the defaults from the _config.yaml file.
hexo.config.category_feed_generator = assign({

}, hexo.config.category_feed_generator);

// Register the generator with hexo.
hexo.extend.generator.register('category-feed', require('./lib/generator'));