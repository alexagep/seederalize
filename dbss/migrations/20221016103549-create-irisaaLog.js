"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("IrisaaLogs", {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        unique: true,
      },
      guard_id: {
        type: Sequelize.UUID,
        allowNull: false,
        field: "guard_id",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: {
          model: "Guards",
          key: "id",
        },
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        field: "user_id",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: {
          model: "Users",
          key: "id",
        },
      },
      status: {
        type: Sequelize.ENUM,
        values: ["error", "success"],
        allowNull: false
      },
      data: { type: Sequelize.JSONB, allowNull: false },
      updatedAt: {
        type: Sequelize.DATE,
        field: "updated_at",
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        field: "created_at",
        allowNull: false,
      },
    });
    await queryInterface.addIndex("IrisaaLogs", ["guard_id"]);
  },

  async down(queryInterface) {
    await queryInterface.dropTable("IrisaaLogs");
  },
};
