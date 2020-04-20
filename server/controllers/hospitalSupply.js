const HospitalSupply = require('../models/hospitalSupply');
const Hospital = require('../models/hospital');
const selection = '_id product_name demand_unit demand';

class HospitalSupplyController {
  static async getAll(req, res, next) {
    try {
      const { hospitalId } = req.params;
      let filter = {};
      if (req.query.search) {
        const search = req.query.search;
        filter.product_name = {
          '$regex': search,
          '$options' : 'i',
        };
      }
      const result = await Hospital
        .findById(hospitalId)
        .populate({
          path: 'supplies',
          match: {
            ...filter,
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
        product_name,
        demand_unit,
        demand,
      } = req.body;
      const result = await HospitalSupply
        .create({
          product_name,
          demand_unit,
          demand
        })
      await Hospital
        .update({ _id: hospitalId }, {
          $push: {
            supplies: result._id,
          },
        });
      res
        .status(201)
        .json({
          _id: result._id,
          product_name: result.product_name,
          demand_unit: result.demand_unit,
          demand: result.demand,
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
        product_name,
        demand_unit,
        demand,
      } = req.body;

      const result = await HospitalSupply
        .findByIdAndUpdate(hospitalSupplyId, {
          product_name,
          demand_unit,
          demand,
        }, {
          new: true,
          runValidators: true,
        })
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