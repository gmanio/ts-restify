import * as Knex from 'knex';
import * as restify from 'restify';

class Article {
  private db: Knex;

  constructor(db: Knex) {
    this.db = db;
  }

  public async getArticle(req: restify.Request, res: restify.Response, next: restify.Next) {
    const id = req.params.id;
    const result = await this.db.select().from('article').where('id', id).first();

    res.send(result);
    next();
  }

  public async setArticle(req: restify.Request, res: restify.Response, next: restify.Next) {
    const result = await this.db('article').insert({
      title: req.body.title,
      content: JSON.stringify(req.body.content)
    });

    res.send(result);
    next();
  }
}

export default Article;