const Product = require('../models/product');

class ProductController {
  static async getAll(req, res, next) {
    try {
      const filter = {};
      if (req.query.search) {
        const { search } = req.query;
        filter.name = {
          $regex: search,
          $options: 'i',
        };
      }
      const pagination = {
        size: Number(req.query.size) || 20,
        page: Number(req.query.page) || 0,
      };
      const result = await Product
        .find(filter)
        .limit(pagination.size)
        .skip(pagination.size * pagination.page);

      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  static async create(req, res, next) {
    try {
      const {
        name,
        unit,
      } = req.body;
      const result = await Product
        .create({
          name,
          unit,
        });

      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async edit(req, res, next) {
    try {
      const { productId } = req.params;
      const {
        name,
        unit,
      } = req.body;
      const result = await Product
        .findByIdAndUpdate(productId, {
          name,
          unit,
        }, {
          new: true,
          runValidators: true,
        });

      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  static async delete(req, res, next) {
    try {
      const { productId } = req.params;
      await Product.deleteOne({ _id: productId });

      res.json({
        success: true,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ProductController;
