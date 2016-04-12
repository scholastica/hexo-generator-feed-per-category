Hexo-Generator-Category-Feed
----------------------------
This plugin enables Hexo to generate an RSS or Atom feed per category on the website.
Use npm to install this plugin:

```
npm install hexo-generator-feed-per-category --save
```

In order to use the plugin, add the following to your _config.yml file

```
feed:
    format: rss2
    limit: 10
```

Currently this plugin supports two formats:

 - atom
 - rss2
