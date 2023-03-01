

/**
   * @class seeder for sequelize
   */
export class Seederalize {
  /**
   * This function creates seeder
   * @function create
   * @param {string} date like 1989/05/22(gregorian) or 1368/03/01(jalali)
   * @param {string} dateformat jalali | gregorian(default)
   * @returns {number}
   */
  create(date, dateformat = 'gregorian') {
    return convertors[dateformat](date);
  }
}