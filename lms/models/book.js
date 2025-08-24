'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    static associate(models) {
      Book.hasMany(models.IssuedBook, { foreignKey: 'bookId' });
    }
  }

  Book.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: { type: DataTypes.STRING, allowNull: false },
      author: { type: DataTypes.STRING, allowNull: false },
      isbn: { type: DataTypes.STRING, allowNull: false, unique: true },
      available: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      sequelize,
      modelName: 'Book',
      tableName: 'books',
      timestamps: true, // createdAt & updatedAt
    }
  );

  return Book;
};
