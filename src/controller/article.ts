class Article {
  public async getArticle(db, { id }) {
    const result = await db
      .select()
      .from('article')
      .where('id', id)
      .first();

    return result;
  }

  public async setArticle(db, { title, content }) {
    const result = await db('article')
      .insert({
        title: title,
        content: content
      });

    return result;
  }

  public async getArticleList(db) {
    const result = await db
      .select('id', 'title', 'date')
      .from('article');

    return result;
  }
}

export default Article;