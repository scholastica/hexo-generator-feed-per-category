var path = require('path');
var fs = require('fs');
var nunjucks = require('nunjucks');
var _ = require('underscore');
var s = require('underscore.string');
var env = new nunjucks.Environment();

nunjucks.configure({
    autoescape: false,
    watch: false
});

env.addFilter('uriencode', function(str) {
    return encodeURI(str);
});

var atomTemplateSource = path.join(__dirname, '../atom.xml');
var atomTemplate = nunjucks.compile(fs.readFileSync(atomTemplateSource, 'utf8'), env);
var rss2TemplateSource = path.join(__dirname, '../rss2.xml');
var rss2Template = nunjucks.compile(fs.readFileSync(rss2TemplateSource, 'utf8'), env);

module.exports = function(locals) {
    var hexo = this;
    var config = this.config;

    // Dynamically fetch a list of all newsletter types (e.g. ['LR', 'SPRJ'])
    var newsletters = _.chain(locals.posts.toArray())
      .map(function(post) { return post.newsletters })
      .flatten().compact()
      .map(function(newsletterType) { return newsletterType.toUpperCase() })
      .uniq().value()

    // Loop through each newsletter...
    return newsletters.reduce(function(results, newsletter) {

        var category_url = config.root + s.slugify(newsletter);
        var feed_url = category_url + '-' + (config.feed.format === "rss2" ? "rss2.xml" : "atom.xml");
        var template = config.feed.format === "rss2" ? rss2Template : atomTemplate;

        // Collect all the posts which contain this newsletter. _Note: We're
        // being careful to uppercase all newsletter names. This way newsletter
        // names are case insensitive.
        var posts = locals.posts.filter(function(post) {
            newsletters = (post.newsletters || []).map(function(nl) { return nl.toUpperCase() })
            return _.contains(newsletters, newsletter.toUpperCase())
        })

        if(config.feed.limit) {
            posts = posts.limit(config.feed.limit);
        }

        var url = config.url;
        if (url[url.length - 1] !== '/') url += '/';

        var xml = template.render({
            posts: posts,
            feed_url: feed_url,
            url: url,
            category_url: category_url
        });

        return results.concat({ data: xml, path: feed_url });
    }, []);
};
