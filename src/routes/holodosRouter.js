import express from 'express';
import { Category, Product } from '../../db/models';

const holodosRouter = express.Router();

holodosRouter.route('/')
  .get(async (req, res) => {
    const allCategory = await Category.findAll();
    const allProducts = await Product.findAll({ include: Category });
    const initState = { allCategory, allProducts };
    res.render('Layout', initState);
  });

holodosRouter.route('/add')
  .post(async (req, res) => {
    try {
      const newCategory = await Category.create(req.body);
      res.json(newCategory);
    } catch (err) {
      console.log(err);
    }
  });

holodosRouter.route('/addProduct')
  .post(async (req, res) => {
    try {
      console.log(req.body);
      const newProduct = await Product.create(req.body);
      const categoryPlus = await Product.findByPk(newProduct.id, { include: Category });
      res.json(categoryPlus);
    } catch (err) {
      console.log(err);
    }
  });

holodosRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await Product.destroy({ where: { id } });
  res.sendStatus(200);
});

holodosRouter.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const edit = await Product.update({ name }, { where: { id } });
  console.log(edit);
  res.sendStatus(200);
});
export default holodosRouter;
