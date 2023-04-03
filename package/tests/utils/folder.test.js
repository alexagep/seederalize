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
}


module.exports = folderTest