const packagejson = require('../package.json');



const randomRole = (n) => {
  const array = ["guard", "user", "admin", "hr", "developer", "maintainer"];

  let random = array.sort(() => 0.5 - Math.random()).slice(0, n);

  return random[0];
};

const randomUsername = (length) => {
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

const randomEmail = () => {
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

const randomName = (length) => {
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

const randomNumber = (length) => {
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

const randomUUID = () => {
  // Public Domain/MIT
  var d = new Date().getTime(); //Timestamp
  var d2 =
    (typeof performance !== "undefined" &&
      performance.now &&
      performance.now() * 1000) ||
    0; //Time in microseconds since page-load or 0 if unsupported
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
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
  });
};

const todayDate = () => {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = today.getFullYear();
  today = yyyy + mm + dd;

  return today;
};

const reservation = () => {
  let counter = Math.floor(100000 + Math.random() * 999999);
  return function () {
    counter++;
    return counter;
  };
};
let reservationCount = reservation();

function getEnumValue(values) {
  let random = values.sort(() => 0.5 - Math.random()).slice(0, 1);

  return random[0];
}

const packageVersion = () => {
  console.log(`${packagejson.name}@${packagejson.version}`);
}

const showingHelp = () => {
  // console.log('******');
  const help = `
    Usage: seederalize -h <host> -d <database> -p [port] -u <user> -x [password] -e [engine]

    Options:
      --help                 Show help command line options            
      -v, --version          Show version number                         
      -h, --host             IP address/Hostname for database server
                                                            [default: "127.0.0.1" or "localhost"]
      -d, --database         Database name                             [required] 
      -u, --user             Username for database server              [default: "postgres"]
      -x, --pass             Password for database server              [default: "postgres"]
      -p, --port             Port number for database server           [default: 5432]
      -e, --engine           Database engine     
                                        [choices: "postgres", "mysql"]  [default: "postgres"]
      -o, --output           Where to place generated models   [default: "./db"]
      -l, --logging          logging option when composing a query object   [default: false] [boolean]
      `

  console.log(help);
}

module.exports = {
  reservationCount,
  todayDate,
  showingHelp,
  packageVersion,
  randomUUID,
  randomNumber,
  randomName,
  randomEmail,
  randomUsername,
  randomRole,
  getEnumValue
};
