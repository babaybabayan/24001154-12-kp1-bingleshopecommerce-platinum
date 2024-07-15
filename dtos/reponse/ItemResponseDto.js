exports.buildItem = (item) => {
  return {
    id: item.id,
    name: item.name,
    description: item.description,
    price: item.price,
    stock: item.stock,
    imageUrl: item.imageUrl,
  };
};
