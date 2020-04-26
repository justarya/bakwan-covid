const HospitalSupply = require('../models/hospitalSupply');
const Hospital = require('../models/hospital');
const selection = '_id product demand';

class HospitalSupplyController {
  static async getAll(req, res, next) {
    try {
      const { hospitalId } = req.params;
      const filter = {
        supplies: {},
        product: {},
      };
      if (req.query.search) {
        const search = req.query.search;
        filter.supplies.product_name = {
          '$regex': search,
          '$options' : 'i',
        };
        filter.product.name = {
          '$regex': search,
          '$options' : 'i',
        };
      }
      const result = await Hospital
        .findById(hospitalId)
        .populate({
          path: 'supplies',
          match: {
            ...filter.supplies,
          },
          populate: {
            path: 'product',
            match: {
              ...filter.product,
            },
          },
        })
        .select('supplies');
      if (!result) {
        next({
          code: 404,
          message: 'Hospital not found',
        });
      }
      res.json(result.supplies);

    } catch (err) {
      next(err);
    }
  }
  static async create(req, res, next) {
    try {
      const { hospitalId } = req.params;
      const {
        productId,
        demand,
      } = req.body;
      const result = await HospitalSupply
        .create({
          product: productId,
          demand
        })
      const populatedResult = await result
        .populate('product')
        .execPopulate()

      await Hospital
        .update({ _id: hospitalId }, {
          $push: {
            supplies: populatedResult._id,
          },
        });
      res
        .status(201)
        .json({
          _id: populatedResult._id,
          product: populatedResult.product,
          demand: populatedResult.demand,
        });
    } catch (err) {
      next(err);
    }
  }
  static async edit(req, res, next) {
    try {
      const {
        hospitalSupplyId
      } = req.params;

      const {
        productId,
        demand,
      } = req.body;

      const result = await HospitalSupply
        .findByIdAndUpdate(hospitalSupplyId, {
          product: productId,
          demand,
        }, {
          new: true,
          runValidators: true,
        })
        .populate('product')
        .select(selection);
      
      if (!result) {
        next({
          code: 404,
          message: 'Hospital Supply not found',
        });
      }
      res
        .json(result);
      
    } catch (err) {
      next(err);
    }
  }
  static async delete(req, res, next) {
    try {
      const {
        hospitalId,
        hospitalSupplyId,
      } = req.params;

      const {
        deletedCount: deleteCountHospitalSupply
      } = await HospitalSupply
        .deleteOne({ _id: hospitalSupplyId });
        
      if (deleteCountHospitalSupply) {
        await Hospital
          .updateOne({
              _id: hospitalId
            }, {
              $pull: {
                supplies: hospitalSupplyId,
              },
            }
          );
        res
          .json({
            success: true,    
          });
      }

      next({
        code: 404,
        message: 'Hospital Supply not found',
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = HospitalSupplyController;