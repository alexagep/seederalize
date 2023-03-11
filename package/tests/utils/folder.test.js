const {Directory} = require('../../utils/folder');

const folderTest = () => {
  describe('test folder functions', () => {
    // const folderInjfo = [
    //   {
    //     folderName: 'base64',
    //     fileName: 'image',
    //   },
    // ]

    test('remove base64 from req body', () => {
      const removed = Directory.checkFileExists('ali', 'db')

      console.log(removed);
      // expect(typeof removed).toBe('object')
      // expect(removed.link).toEqual('j2h3b4h2kj34hkj2h34')
    })
  })
}


module.exports = folderTest