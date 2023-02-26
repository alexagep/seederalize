const ioRedis = require("ioredis");

const redis = new ioRedis();

class Redis {

  static async getData(key) {
    const data = JSON.parse(await redis.get(key));

    return data;
  }

  static async setData(key, value) {
    await redis.set(key, JSON.stringify(value))
  }
}

module.exports = { Redis }