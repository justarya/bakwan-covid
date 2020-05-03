const ActivityModel = require('mongoose-activitylogs/activity-model');
const mongoose = require('mongoose');

class ActivityRecordsController {
  static async getAllRecordsHospital(req, res, next) {
    try {
      const result = await ActivityModel
        .find({ collectionType: 'Hospital' });

      if (!result) {
        next({
          code: 404,
          message: 'There is no hospital',
        });
      }

      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  static async getAllRecordsProducts(req, res, next) {
    try {
      const result = await ActivityModel
        .find({ collectionType: 'Product' });

      if (!result) {
        next({
          code: 404,
          message: 'There is no product',
        });
      }

      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  static async getAllRecordsUsers(req, res, next) {
    try {
      const result = await ActivityModel
        .find({ collectionType: 'User' });

      if (!result) {
        next({
          code: 404,
          message: 'There is no user',
        });
      }

      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  static async getAllRecordsHospitalSupplies(req, res, next) {
    try {
      const result = await ActivityModel
        .find({ collectionType: 'HospitalSupply' });

      if (!result) {
        next({
          code: 404,
          message: 'There is no hospital supplies',
        });
      }

      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  static async getRecordsHospitalSupplies(req, res, next) {
    try {
      const { hospitalSupplyId } = req.params;
      const result = await ActivityModel
        .find({
          collectionType: 'HospitalSupply',
          'referenceDocument._id': mongoose.Types.ObjectId(hospitalSupplyId),
        })
        .populate({
          path: 'referenceDocument.product',
          model: 'Product',
        })
        .sort([['createdAt', -1]]);

      if (!result) {
        next({
          code: 404,
          message: 'Hospital supplies not found',
        });
      }
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  static async getRecordsHospitalSuppliesByHospitalId(req, res, next) {
    try {
      const { hospitalId } = req.params;

      const records = await ActivityModel
        .find({ 'referenceDocument.hospital': mongoose.Types.ObjectId(hospitalId) })
        .populate({
          path: 'referenceDocument.product',
          model: 'Product',
        })
        .sort([['createdAt', -1]]);

      res.json(records);
    } catch (err) {
      next(err);
    }
  }

  static groupById(data) {
    return data.reduce((result, value) => {
      const newResult = result;
      newResult[
        value.referenceDocument.product.name
      ] = [
        ...newResult[value.referenceDocument.product.name] || [],
        value,
      ];
      return newResult;
    }, {});
  }
}

module.exports = ActivityRecordsController;
