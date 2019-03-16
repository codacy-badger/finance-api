const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const nconf = require('nconf');

class App {
  constructor({ logger }) {
    this.app = express();
    this.app.set('logger', logger);

    this.app.use(bodyParser.urlencoded({
      extended: true,
    }));
    this.app.use(bodyParser.json({
      type: 'application/json',
    }));
    this.app.use(cookieParser());

    this.app.use((req, res) => {
      return res.sendStatus(501);
    });
  }

  startServer() {
    const app = this.app;
    const logger = this.app.get('logger');

    const port = process.env.PORT || nconf.get('NODE_PORT');
    return app.listen(port, () => {
      logger.info(`[API] Listening on port ${port}`);
    });
  }
}

module.exports = App;
