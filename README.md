_Note: This is a fork of [Hexo-Generator-Category-Feed](https://github.com/wmeints/hexo-generator-feed-per-category)._

### Background
We have a rather specific use case for which no community supported hexo plugins exist:

    Given I am a reader of the blog
    And I want to receive a newsletter (i.e. blog updates via email)
    When I complete the newsletter signup form
    And select each subject area that interests me
    Then my newsletter should only include posts related to subjects I selected

### Problem
MailChimp makes it very easy to create a signup form which includes check boxes for various subject areas. The bigger challenge is automatically creating and sending those emails every week. Luckily, MailChimp provides a handy [RSS-to-Email](http://mailchimp.com/features/rss-to-email) feature. But, to use this feature, we need a _separate RSS feed for each subject area_.

### Solution
Hexo has plugins for creating [a single RSS feed](https://github.com/hexojs/hexo-generator-feed) as well as [RSS feeds for each category](https://github.com/wmeints/hexo-generator-feed-per-category). Unfortunately, those options are not quite what we need.

We need a simple way to specify which newsletters a post should be included in. This plugin lets you do just that by adding a little metadata to your post's front matter. For example, to include your post in the SPRJ newsletter:

    newsletters:
    - SPRJ

And, you can include a post in more than one newsletter:

    newsletters:
    - SPRJ
    - LR

Finally, this will produce two separate RSS feeds:

    http://blog.scholasticahq.com/lr-rss.xml
    http://blog.scholasticahq.com/sprj-rss.xml

Which is exactly what we need to support MailChimp's [RSS-to-Email](http://mailchimp.com/features/rss-to-email) feature!


### Ordering

You can limit and order by fields

In the _config.yml add a `sort_by` key

Example:

    feed:
      type: atom
      limit: 0
      sort_by:
        field: date
        direction: desc


### Technical details
To accomplish this, we forked / hacked the [Hexo-Generator-Category-Feed](https://github.com/wmeints/hexo-generator-feed-per-category) plugin. For more information, including a diff showing exactly what we changed, see https://github.com/scholastica/hexo-generator-feed-per-category/commit/586a0a9e422b2ebdd5c1678535a14b326a87a3dd.
