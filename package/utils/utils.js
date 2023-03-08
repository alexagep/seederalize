const packagejson = require("../package.json");

class Utils {
  static randomRole = (n) => {
    const array = ["guard", "user", "admin", "hr", "developer", "maintainer"];

    let random = array.sort(() => 0.5 - Math.random()).slice(0, n);

    return random[0];
  };

  static randomUsername = (length) => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  };

  static randomEmail = () => {
    var strValues = "abcdefghijklmnopqrstuvwxyz0123456789";
    var strEmail = "";
    var strTmp;

    for (var j = 0; j < 10; j++) {
      strTmp = strValues.charAt(Math.round(strValues.length * Math.random()));
      strEmail = strEmail + strTmp;
    }
    strEmail += "@gmail.com";
    return strEmail;
  };

  static randomName = (length) => {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  };

  static randomNumber = (length) => {
    let result = "";
    const characters = "0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  };

  static randomUUID = () => {
    // Public Domain/MIT
    var d = new Date().getTime(); //Timestamp
    var d2 =
      (typeof performance !== "undefined" &&
        performance.now &&
        performance.now() * 1000) ||
      0; //Time in microseconds since page-load or 0 if unsupported
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = Math.random() * 16; //random number between 0 and 16
        if (d > 0) {
          //Use timestamp until deleted
          r = (d + r) % 16 | 0;
          d = Math.floor(d / 16);
        } else {
          //Use microseconds since page-load if supported
          r = (d2 + r) % 16 | 0;
          d2 = Math.floor(d2 / 16);
        }
        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
  };

  static todayDate = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = today.getFullYear();
    today = yyyy + mm + dd;

    return today;
  };

  static getEnumValue(values) {
    let random = values.sort(() => 0.5 - Math.random()).slice(0, 1);

    return random[0];
  }

  static packageVersion = () => {
    process.stderr.write(
      [
        // No dependencies, so we do it from hand.
        `${packagejson.name}@${packagejson.version} (c) ${packagejson.author}`,
      ].join("\n") +
        "\n\n" +
        `Usage: seederalize -h <host> -d <database> -p [port] \n -u <user> -x [password] -e [engine] \n\n
        or use --desc to see description of the package\n\n`
    );
    process.exit(1);
  };

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
        `;

    console.log(help);
    process.exit(1);
  };
}

reservation = () => {
  let counter = Math.floor(100000 + Math.random() * 999999);
  return function () {
    counter++;
    return counter;
  };
};
const reservationCount = reservation();

module.exports = {
  Utils,
  reservationCount,
};
