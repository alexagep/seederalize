const ioRedis = require('ioredis')

const redis = new ioRedis()

class Redis {

  /**
   * reads data from our local redis server by the passed key
   * @type {function}
   * @function getData
   * @param {string} key
   */
  static async getData(key) {
    if (!key) {
      throw new Error('key is required');
    }
    const data = JSON.parse(await redis.get(key))

    return data
  }

  /**
   * it will sets data into redis by passing key and value
   * @type {function}
   * @function setData
   * @param {string} key
   * @param {string} value
   */
  static async setData(key, value) {
    if (!value) {
      throw new Error('value is required');
    }
    await redis.set(key, JSON.stringify(value))
  }
}

module.exports = { Redis }
