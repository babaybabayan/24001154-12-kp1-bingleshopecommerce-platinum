"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrderDetail.belongsTo(models.user, {
        foreignKey: "userId",
      });
      OrderDetail.hasMany(models.Order, {
        as: "orders",
        foreignKey: "detailId",
      });
    }
  }
  OrderDetail.init(
    {
      userId: DataTypes.INTEGER,
      transactionId: { type: DataTypes.STRING, unique: true, allowNull: false },
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "OrderDetail",
    }
  );
  return OrderDetail;
};
