'use strict'

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        unique: true,
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'first_name',
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'last_name',
      },
      image_path: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      role: {
        type: Sequelize.STRING,
        defaultValue: 'user',
      },
      national_code: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'national_code',
        unique: true,
      },
      created_at: {
        type: Sequelize.DATE,
        field: 'created_at',
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        field: 'updated_at',
        allowNull: false,
      },
      deleted_at: {
        type: Sequelize.DATE,
        field: 'deleted_at',
      },
    })
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Users')
  },
}
