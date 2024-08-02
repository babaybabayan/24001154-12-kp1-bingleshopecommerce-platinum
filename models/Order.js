"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.Item, { as: "item", foreignKey: "itemId" });
    }
  }
  Order.init(
    {
      itemId: DataTypes.INTEGER,
      detailId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      sales: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
