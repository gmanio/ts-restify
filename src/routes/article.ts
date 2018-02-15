import { masterDB, slaveDB } from '../db';
import Article from '../controller/article';

export const articleRoutes = (server) => {
  const articleController = new Article();

  /**
   * Article Table
   */
  server.get('/article/:id', async (req, res, next) => {
    const id = req.params.id;
    res.send(await articleController.getArticle(slaveDB(), { id }));
    return next();
  });

  server.get('/article', async (req, res, next) => {
    res.send(await articleController.getArticleList(slaveDB()));
    return next();
  });

  server.post('/article/save', async (req, res, next) => {
    const params = {
      title: req.body.title,
      content: JSON.stringify(req.body.content)
    }

    res.send(await articleController.setArticle(masterDB(), params));
    return next();
  });
}