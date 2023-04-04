const folderTest = require('./utils/folder.test');
const redisTest = require('./utils/redis.test');

describe('unit testing the methods', () => {

  describe('Folder:', () => {
    folderTest()
  })

  describe('Redis', () => {
    redisTest()
  })
})
