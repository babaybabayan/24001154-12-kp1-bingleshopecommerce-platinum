exports.buildOrder = (order) => {
    return {
      id: order.id,
      user_id: order.user_id,
      item_id: order.item_id,
      quantity: order.quantity,
      total_price: order.total_price,
      status: order.status,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    };
  };
  