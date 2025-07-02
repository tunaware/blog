module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("style.css");

  eleventyConfig.addCollection("posts", function(collectionApi) {
    const posts = collectionApi.getFilteredByGlob("posts/*.md");

    // Kategorilere göre ayır
    const categories = {};
    for (let post of posts) {
      let cat = post.data.category || "Genel";
      if (!categories[cat]) categories[cat] = [];
      categories[cat].push(post);
    }

    // Her kategori için koleksiyon tanımla
    for (let cat in categories) {
      eleventyConfig.addCollection(`category_${cat}`, () => categories[cat]);
    }

    return posts;
  });

  return {
    dir: {
      input: ".",
      includes: "_includes"
    }
  };
};


  // Etiket koleksiyonu
  eleventyConfig.addCollection("tagsList", function(collection) {
    let tagSet = new Set();
    collection.getAll().forEach(item => {
      if ("tags" in item.data) {
        let tags = item.data.tags;
        tags = Array.isArray(tags) ? tags : [tags];
        tags.forEach(tag => tagSet.add(tag));
      }
    });
    return [...tagSet];
  });
