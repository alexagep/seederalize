const ioRedis = require('ioredis')
const { Redis } = require('../../utils/redis')

jest.mock('ioredis')

const redisTest = () => {
  describe('Redis', () => {
    beforeEach(() => {
      ioRedis.mockClear()
      ioRedis.prototype.get.mockClear()
      ioRedis.prototype.set.mockClear()
    })

    describe('getData', () => {
      test('should get data from redis', async () => {
        const key = 'myKey'
        const expectedValue = { foo: 'bar' }
        ioRedis.prototype.get.mockResolvedValue(JSON.stringify(expectedValue))

        const result = await Redis.getData(key)

        expect(ioRedis.prototype.get).toHaveBeenCalledWith(key)
        expect(result).toEqual(expectedValue)
      })

      test('should return null if key is not present in redis', async () => {
        ioRedis.prototype.get.mockResolvedValue(null)

        const result = await Redis.getData('non-existing-key')

        expect(result).toBeNull()
        expect(ioRedis.prototype.get).toHaveBeenCalledWith('non-existing-key')
      })

      test('should throw error if key is not provided', async () => {
        await expect(Redis.getData()).rejects.toThrow('key is required')
      })
    })

    describe('setData', () => {
      test('should set data in redis', async () => {
        const key = 'myKey'
        const value = { foo: 'bar' }

        await Redis.setData(key, value)

        expect(ioRedis.prototype.set).toHaveBeenCalledWith(
          key,
          JSON.stringify(value)
        )
      })

      test('should throw error if value is not provided', async () => {
        await expect(Redis.setData('some-key')).rejects.toThrow(
          'value is required'
        )
      })
    })
  })
}

module.exports = redisTest