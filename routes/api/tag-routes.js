const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
// find all tags
  // be sure to include its associated Product data
router.get('/', async (req, res) => {
  try {
    const allData = await Tag.findAll({
      include: [{model: Product}, {through: ProductTag}],
    });
    if (!allData) {
      res.status(404).json({ message: 'No data found!' });
      return;
    }
    res.status(200).json(allData);
  } 
  catch (err) {
    res.status(500).json(err);
  }
  });

  // find a single tag by its `id`
  // be sure to include its associated Product data
router.get('/:id', async (req, res) => {
  try {
    const singleTag = await Tag.findByPk(req.params.i, {
      include: [{model: Product}, {through: ProductTag}]
    });
    if (!singleTag) {
      res.status(404).json({ message: 'No data found!' });
      return; 
  }
  res.status(200).json(singleTag);
}
  catch(err) {
    res.status(500).jason(err);
  }
});

// create a new tag
router.post('/', async (req, res) => {
  try {
    const createTag = await Tag.create(req.body);
    res.status(200).json(createTag);
  }
  catch (err) {
    res.status(400).json(err);
  }
});

// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
 try {
  const updateTag = await Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  });
  if (!updateTag) {
    res.status(404).json({message: 'This is not what you are looking for'});
    return;
  }
  res.status(200).json(updateTag);
  } catch (err) {
    res.status(500).json(err);
 }
});

// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const deleteData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!deleteData) {
      res.status(404).json({ message: 'No Tag matches this id!' });
      return;
    }
    res.status(200).json(deleteData);
  }
  
});

module.exports = router;
