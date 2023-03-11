const packagejson = require('../package.json')
const md5 = require("md5");

class Utils {
  /**
   * returns n amount of our static array of roles
   * @type {function}
   * @function randomRole
   * @param {integer} n
   * @return {string}
   */
  static randomRole = (n) => {
    const array = ['guard', 'user', 'admin', 'hr', 'developer', 'maintainer']

    let random = array.sort(() => 0.5 - Math.random()).slice(0, n)

    return random[0]
  }

  /**
   * this function generates a random username which will have charachters with passed length
   * @type {function}
   * @function randomUsername
   * @param {integer} length
   * @return {string}
   */
  static randomUsername = (length) => {
    let result = ''
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    let counter = 0
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
      counter += 1
    }
    return result
  }

  /**
   * this function generates a random gmail
   * @type {function}
   * @function randomEmail
   * @return {string}
   */
  static randomEmail = () => {
    var strValues = 'abcdefghijklmnopqrstuvwxyz0123456789'
    var strEmail = ''
    var strTmp

    for (var j = 0; j < 10; j++) {
      strTmp = strValues.charAt(Math.round(strValues.length * Math.random()))
      strEmail = strEmail + strTmp
    }
    strEmail += '@gmail.com'
    return strEmail
  }

  /**
   * this function generates a random name which will have charachters with passed length
   * @type {function}
   * @function randomName
   * @param {integer} length
   * @return {string}
   */
  static randomName = (length) => {
    let result = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    const charactersLength = characters.length
    let counter = 0
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
      counter += 1
    }
    return result
  }

  /**
   * this function generates a random number which will have charachters with passed length
   * @type {function}
   * @function randomNumber
   * @param {integer} length
   * @return {string}
   */
  static randomNumber = (length) => {
    let result = ''
    const characters = '0123456789'
    const charactersLength = characters.length
    let counter = 0
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
      counter += 1
    }
    return result
  }

  /**
   * this function generates a random UUID
   * @type {function}
   * @function randomUUID
   * @return {string}
   */
  static randomUUID = () => {
    // Public Domain/MIT
    var d = new Date().getTime() //Timestamp
    var d2 =
      (typeof performance !== 'undefined' &&
        performance.now &&
        performance.now() * 1000) ||
      0 //Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
      /[xy]/g,
      function (c) {
        var r = Math.random() * 16 //random number between 0 and 16
        if (d > 0) {
          //Use timestamp until deleted
          r = (d + r) % 16 | 0
          d = Math.floor(d / 16)
        } else {
          //Use microseconds since page-load if supported
          r = (d2 + r) % 16 | 0
          d2 = Math.floor(d2 / 16)
        }
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
      }
    )
  }

  /**
   * this function returns today's date
   * @type {function}
   * @function todayDate
   * @return {string}
   */
  static todayDate = () => {
    let today = new Date()
    let dd = String(today.getDate()).padStart(2, '0')
    let mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
    let yyyy = today.getFullYear()
    today = yyyy + mm + dd

    return today
  }

  /**
   * this function returns a random value between passed values
   * @type {function}
   * @function todayDate
   * @return {string}
   */
  static getEnumValue(values) {
    let random = values.sort(() => 0.5 - Math.random()).slice(0, 1)

    return random[0]
  }

  /**
   * this function writes package version and its author on the terminal
   * @type {function}
   * @function packageVersion
   */
  static packageVersion = () => {
    process.stderr.write(
      [
        // No dependencies, so we do it from hand.
        `${packagejson.name}@${packagejson.version} (c) ${packagejson.author}`,
      ].join('\n') +
        '\n\n' +
        `Usage: seederalize -h <host> -d <database> -p [port] \n -u <user> -x [password] -e [engine] \n\n
        or use --desc to see description of the package\n\n`
    )
    process.exit(1)
  }

  /**
   * this function writes package info / help section on the terminal
   * @type {function}
   * @function showingHelp
   */
  static showingHelp = () => {
    const help = `
      Usage: seederalize -h <host> -d <database> -p [port] -u <user> -x [password] -e [engine]

      Options:
        --desc                 Show help command line options
        -v                     Show version number
        -h, --host             IP address/Hostname for database server
                                                              [default: "127.0.0.1" or "localhost"]
        -d, --database         Database name                             [required]
        -u, --user             Username for database server              [required]
        -x, --pass             Password for database server              [required]
        -p, --port             Port number for database server           [default: 5432]
        -e, --engine           Database engine
                                          [choices: "postgres", "mysql"]  [default: "postgres"]
        -o, --output           Where to place generated models   [default: "./db"]
        -l, --logging          logging option when composing a query object   [default: false] [boolean]
        `

    console.log(help)
    process.exit(1)
  }

  /**
   * this function hashes raw password with md5 package and returns that hashed password
   * @type {function}
   * @function hashPass
   * @return {string}
   */
  static hashPass = (rawPassword, { salt = 15, rounds = 10 }) => {

    let hashed = md5(rawPassword + salt);
    for (let i = 0; i <= rounds; i++) {
      hashed = md5(hashed);
    }

    return `${salt}$${rounds}$${hashed}`;
  }
}

/**
 * this function generates random incremental 6 digit number
 * @type {function}
 * @function reservation
 */
reservation = () => {
  let counter = Math.floor(100000 + Math.random() * 999999)
  return function () {
    counter++
    return counter
  }
}
const reservationCount = reservation()

module.exports = {
  Utils,
  reservationCount,
}
