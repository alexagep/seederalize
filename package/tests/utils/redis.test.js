const redis = require('ioredis')
const { promisify } = require('util')
const { Redis } = require('../../utils/redis')

// mock redis client
// const redisClient = redis.createClient()
// const redisGetAsync = promisify(redisClient.get).bind(redisClient)
jest.mock('ioredis', () => {
  const mIORedis = jest.fn(() => ({
    get: jest.fn().mockResolvedValue('mocked-value'),
  }))
  return mIORedis
})

const redisTest = () => {
  describe('getData', () => {
    const mockIORedisClient = new redis()
    const ioredisGetAsync = promisify(mockIORedisClient.get).bind(mockIORedisClient)

    test('should return parsed JSON data from redis', async () => {
      const data = { name: 'John', age: 30 }
      mockIORedisClient.get.mockImplementationOnce((key, cb) =>
        cb(null, JSON.stringify(data))
      )

      const result = await Redis.getData('test-key')

      expect(mockIORedisClient.get).toHaveBeenCalledWith(
        'test-key',
        expect.any(Function)
      )
      expect(result).toEqual(data)
    })

    test('should return null if redis key does not exist', async () => {
      mockIORedisClient.get.mockImplementationOnce((key, cb) => cb(null, null))

      const result = await Redis.getData('non-existent-key')

      expect(mockIORedisClient.get).toHaveBeenCalledWith(
        'non-existent-key',
        expect.any(Function)
      )
      expect(result).toBeNull()
    })

    test('should throw an error if redis client returns an error', async () => {
      const mockError = new Error('Redis error')
      mockIORedisClient.get.mockImplementationOnce((key, cb) => cb(mockError, null))

      await expect(Redis.getData('test-key')).rejects.toThrow(mockError)
      expect(mockIORedisClient.get).toHaveBeenCalledWith(
        'test-key',
        expect.any(Function)
      )
    })
  })
}

module.exports = redisTest
