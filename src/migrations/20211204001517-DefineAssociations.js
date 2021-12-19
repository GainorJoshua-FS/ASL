'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    queryInterface.addColumn('Questions', 'quizId', {
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Quizzes'
        },
        key: 'id'
      },
      allowNull: true
    })
    queryInterface.addColumn('Choices', 'questionId', {
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Questions'
        },
        key: 'id'
      },
      allowNull: true
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    queryInterface.removeColumn('Questions', 'quizId')
    queryInterface.removeColumn('Choices', 'questionId')
  }
};
