// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category,{
  foreignKey: 'category_id',
  onDelete: '',
});

// Categories have many Products
Category.hasMany( Product, {
  foreignKey: 'product_id',
  onDelete: '',
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  foreignKey: 'product_id',
  onDelete: '',
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  foreignKey: 'tag_id',
  onDelete: '',
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
