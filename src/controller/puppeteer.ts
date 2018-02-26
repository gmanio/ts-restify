class Puppeteer {
  public async setScreenCapture(db, { url, screenshot }) {
    // const queryParams = querystring.parse(req.getQuery());
    const result = await db.insert({ url, screenshot }).into('puppeteer');
    // const result = await db.select().from('puppeteer');

    return result;
  }

  public async getScreenCaptureList(db) {
    const result = await db.select().from('puppeteer');
    return result;
  }
}

export default Puppeteer;