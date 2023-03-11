# Seederalize [![NPM Module](https://img.shields.io/badge/npm%20package-0.9.4-red)](https://github.com/alexagep/seederalize)

***
Generates how many seed files you want for Sequelize from existing databases in less than a second.
Supported db engines till now:
* PostgreSQL
* MySQL

## Installation
### Global module
To install module globally simply type npm i -g seederalize in your console.
### Local module
or use it directly in your project with npm install seederalize



## Usage
There are two ways to use this utility:
- Use step by step wizard which will guide you though the process - just type `npx seederalize` in your console.
- Provide all parameters through command line(examples below)

```
Usage:

const { createFile } = require('seederalize')

createFile({
    count: 5,
    output : 'test-seed',
    username: 'username',
    password: 'password',
    database: 'seederalize',
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
    port: 5432
  })
```

Use `npx seederalize --desc` to see all available parameters with their descriptions. Some basic parameters below:
```shell
Usage: seederalize -h <host> -d <database> -p [port] -u <user> -x
[password] -e [engine]

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
```


### Examples

* Creating seed from local Postgres database
   * Global module
      ```
      seederalize -h localhost -d postgres -u postgres -x !Passw0rd -e postgres -o .
      ````
   * Npx Way
      ```
      npx seederalize -h localhost -d postgres -u postgres -x !Passw0rd -e postgres -o .
      ````

### Hashing passwords
* you can see how we hash passwords using md5 package like below:
  ```
  function hashPass(rawPassword, { salt = 15, rounds = 10 }) {

    let hashed = md5(rawPassword + salt);
    for (let i = 0; i <= rounds; i++) {
      hashed = md5(hashed);
    }

    return `${salt}$${rounds}$${hashed}`;
  }
  ```
* if you want to use it in your code to compare passwords, here you are:
  ```
  function compare(rawPassword, hashedPassword) {
    try {
      const [ salt, rounds ] = hashedPassword.split('$');

      const hashedRawPassword = hashPass(rawPassword, { salt, rounds });
      return hashedPassword === hashedRawPassword;
    } catch (error) {
      throw Error(error.message);
    }
  }
  ```



## 🤝 Contribution

I will be grateful for any help you can provide to make this package better

