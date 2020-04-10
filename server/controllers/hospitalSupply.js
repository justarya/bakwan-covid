const HospitalSupply = require('../models/hospitalSupply');
const Hospital = require('../models/hospital');
const selection = 'product_name supply demand';

class HospitalSupplyController {
  static async getAll(req, res, next) {
    try {
      const { hospitalId } = req.params;
      const result = await Hospital
        .findById(hospitalId)
        .populate('supplies')
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
        supply,
        demand,
      } = req.body;
      const result = await HospitalSupply
        .create({
          product_name,
          supply,
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
          product_name: result.product_name,
          supply: result.supply,
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
        supply,
        demand,
      } = req.body;

      const result = await HospitalSupply
        .findByIdAndUpdate(hospitalSupplyId, {
          product_name,
          supply,
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
                supplies: {
                  $elemMatch: hospitalSupplyId,
                },
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