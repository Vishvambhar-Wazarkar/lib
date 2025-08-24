'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class IssuedBook extends Model {
    static associate(models) {
      IssuedBook.belongsTo(models.User, { foreignKey: 'userId' });
      IssuedBook.belongsTo(models.Book, { foreignKey: 'bookId' });
    }
  }

  IssuedBook.init(
    {
      userId: { type: DataTypes.INTEGER, allowNull: false },
      bookId: { type: DataTypes.INTEGER, allowNull: false },
      issueDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      returnDate: { type: DataTypes.DATE, allowNull: true },
    },
    {
      sequelize,
      modelName: 'IssuedBook',
      tableName: 'issued_books',
      timestamps: true,
    }
  );

  return IssuedBook;
};
