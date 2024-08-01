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

exports.buildOrderDetail = (orderDetail) => {
  return orderDetail.map((detail) => {
    return {
      transactionNo: detail.transactionId,
      username: detail.user.username,
      status: detail.status,
      order: builOrder(detail.orders),
    };
  });
};

function builOrder(order) {
  return order.map((order) => {
    return {
      item: order.item.name,
      quantity: order.quantity,
      sales: order.sales,
      image: order.item.imageUrl,
    };
  });
}
