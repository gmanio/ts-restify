import Puppeteer from '../controller/puppeteer';
import { puppeteerDB } from '../db';

process.setMaxListeners(Infinity); // <== Important line

export const puppeteerRoutes = (server) => {
  const controller = new Puppeteer();

  server.post('/puppeteer', async (req, res, next) => {
    // const url = req.query.url ? +req.query.url : 'test';
    // const screenshot = req.query.screenshot ? req.query.screenshot : 'test';
    // const data = JSON.parse(req.body);
    // console.log(data);
    console.log(req.body.url);
    res.send(await controller.setScreenCapture(puppeteerDB(), { url: req.body.url, screenshot: req.body.screenshot }));
    return next();
  });
  server.get('/puppeteer/get', async (req, res, next) => {

    res.send(await controller.getScreenCaptureList(puppeteerDB()));
    return next();
  });
};