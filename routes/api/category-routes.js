const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
// find all categories
  // be sure to include its associated Products

router.get('/', async (req, res) => {
  try {
    const allCategories = await Category.findAll({
      include:[{model: Product}]
    });
    res.status(200).json(allCategories);
  } 
  catch (err) {
    res.status(500).json(err);
  }
  
});

// find one category by its `id` value
  // be sure to include its associated Products
router.get('/:id', async (req, res) => {
  try { 
    const categoryData = await Category.findByPk(req.params.id,{
      include: [{model: Product}]
    })
    if (!categoryData) {
      res.status(404).json({ message: 'No Category found!' });
      return;
    }
     res.status(200).json(categoryData);
  }
  catch (err) {
    res.status(500).json(err);
  }  
  
});

 // create a new category
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  }
  catch (err) {
    res.status(400).json(err);
  }
});

 // update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const updateCategory = await Category.update(req.body,{
      where: {
        id: req.params.id
      },
    });
    if (!updateCategory) {
      res.status(404).json({ message: 'This is not what you are looking for!' });
      return;
    }
    res.status(200).json(updateCategory);
  } catch (err) {
    res.status(500).json(err);
  
  }
});

// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const delCategory = await Category.destroy({
      where: {
        id: req.params.id
      },
    });
    if (!delCategory) {
      res.status(404).json({message: 'No Cateegory matches this id!'});
      return
    }
    res.status(200).json(delCategory);
  } catch (err) {
    res.status(500).json(err);
  }
 
});

module.exports = router;
