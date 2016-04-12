module.exports = function(locals) {
    var hexo = this;

    return locals.categories.reduce(function(results,category) {
        var url_for = hexo.extend.helper.get('url_for');
        return results.concat({ data: null });
    });
};