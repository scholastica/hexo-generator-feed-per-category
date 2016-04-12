'use strict';

var mocha = require('mocha');
var should = require('chai').should();
var Hexo = require('hexo');

describe('hexo-generator-category-feed', function() {
    // Start hexo and register the helpers used by hexo.
    var hexo = new Hexo(__dirname, { silent: true });
    var helpers = require('../node_modules/hexo/lib/plugins/helper')(hexo);

    var Post = hexo.model('Post');
    var generator = require('../lib/generator').bind(hexo);

    var locals = {};
    var posts = null;

    hexo.config.category_feed_generator = {

    };

    before(function() {
        return Post.insert([
            { source: 'foo1', slug: 'foo1', date: 1e8 },
            { source: 'foo2', slug: 'foo2', date: 1e8 +1 },
            { source: 'foo3', slug: 'foo3', date: 1e8 -1 },
        ]).then(function(data) {
            posts = data;

            return posts[0].setCategories(['javascript']).then(function() {
                return posts[1].setCategories(['web']);
            }).then(function() {
                return posts[2].setCategories(['windows']);
            });
        }).then(function() {
            locals = hexo.locals.toObject();
        });
    });

    it('generates RSS2 feeds', function() {
        var result = generator(locals);
    });
});