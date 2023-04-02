const {Directory} = require('../../utils/folder');
const fs = require('fs');


const folderTest = () => {
  describe('checkFileExists', () => {
    const folderName = 'test-folder'

    beforeAll(() => {
      // Create a temporary folder and seed file for testing
      fs.mkdirSync(`${process.cwd()}/${folderName}`)
      fs.mkdirSync(`${process.cwd()}/${folderName}/seeders`)
      fs.writeFileSync(`${process.cwd()}/${folderName}/seeders/1-test-file.js`, '')
    })

    afterAll(() => {
      // Clean up the temporary folder and file after testing
      fs.unlinkSync(`${process.cwd()}/${folderName}/seeders/1-test-file.js`)
      fs.rmdirSync(`${process.cwd()}/${folderName}/seeders`)
      fs.rmdirSync(`${process.cwd()}/${folderName}`)
    })

    test('should return null if file does not exist', () => {
      expect(Directory.checkFileExists('non-existent-file', folderName)).toBeNull()
    })

    test('should return the file name if it exists', () => {
      expect(Directory.checkFileExists('file', folderName)).toEqual('1-test-file.js')
    })
  })

  describe('namingFolder', () => {
    const folderName = 'test-folder'

    afterEach(() => {
      // Clean up the temporary folder after each test
      fs.rmdirSync(`${process.cwd()}/${folderName}/seeders`)
      fs.rmdirSync(`${process.cwd()}/${folderName}/models`)
      fs.rmdirSync(`${process.cwd()}/${folderName}`)
    })

    test('should create a folder with the specified name', () => {
      Directory.namingFolder(folderName)

      expect(fs.existsSync(`${process.cwd()}/${folderName}`)).toBe(true)
    })

    test('should create a seeders sub-folder', () => {
      Directory.namingFolder(folderName)

      expect(fs.existsSync(`${process.cwd()}/${folderName}/seeders`)).toBe(true)
    })

    test('should create a models sub-folder', () => {
      Directory.namingFolder(folderName)

      expect(fs.existsSync(`${process.cwd()}/${folderName}/models`)).toBe(true)
    })

    test('should not overwrite existing folders', () => {
      // Create seeders and models folders manually before running test
      fs.mkdirSync(`${process.cwd()}/${folderName}`)
      fs.mkdirSync(`${process.cwd()}/${folderName}/seeders`)
      fs.mkdirSync(`${process.cwd()}/${folderName}/models`)

      Directory.namingFolder(folderName)

      expect(fs.existsSync(`${process.cwd()}/${folderName}/seeders`)).toBe(true)
      expect(fs.existsSync(`${process.cwd()}/${folderName}/models`)).toBe(true)
    })
  })

}


module.exports = folderTest