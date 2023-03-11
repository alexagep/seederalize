/**
 * this function validates commands to check if the required fields are used or not
 * @type {function}
 * @function validationCommands
 */
const validationCommands = (option) => {
  try {
    let errorCollect = []
    let clause =
      `for connecting to the database, You Need To Provide The Required Items: `;
    if (!option.d && !option.database) {
      errorCollect.push("Database Name")
    }
    if (!option.u && !option.username) {
      errorCollect.push("Username")
    }
    if (!option.x && !option.password) {
      errorCollect.push("Password")
    }

    if (errorCollect.length === 0) {
      return true;
    }

    clause += `${errorCollect} \n for more information you can use --desc`;
    throw clause;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = { validationCommands };
