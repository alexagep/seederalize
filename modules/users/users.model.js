"use strict";

// import { Model } from 'sequelize'
const { Sequelize, DataTypes, Model } = require("sequelize");
// import env from '../common/env'
// const env = require('./common/env')
const sequelize = new Sequelize(
  process.env["PG_DATABASE"],
  process.env["PG_USER"],
  process.env["PG_PASS"],
  {
    host: "localhost",
    dialect: "postgres",
  }
);

export default (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.IrisaaLog);
    }
  }

  User.init(
    {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "first_name",
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "last_name",
      },
      nationalCode: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "national_code",
        unique: true,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imagePath: {
        type: DataTypes.STRING,
        field: "image_path",
        allowNull: false,
        defaultValue: {},
      },
      createdAt: {
        type: DataTypes.DATE,
        field: "created_at",
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: "updated_at",
        allowNull: false,
      },
      deletedAt: {
        type: DataTypes.DATE,
        field: "deleted_at",
      },
    },
    {
      sequelize,
      paranoid: true,
      modelName: "User",
    }
  );
  // console.log(User, "***---****---****---***");
  return User;
};

// module.exports = User
