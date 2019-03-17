require('../../config/');

const App = require('../../app/');

class TestHelper {
  async cleanup() {
    if (!this.app || !this.server) {
      throw new Error('App not yet initialized.');
    }
    await this.server.close();
  }

  constructor() {
    this.app = null;
    this.server = null;
  }

  async getApp() {
    if (!this.app) {
      await this.setup();
    }
    return this.app;
  }

  async getServer() {
    if (!this.server) {
      await this.setup();
    }
    return this.server;
  }

  async setup() {
    this.app = new App({
      logger: {
        error: () => {},
        info: () => {},
      },
    });
    this.server = await this.app.startServer();
  }
}

module.exports = TestHelper;
