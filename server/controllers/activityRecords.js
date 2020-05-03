const ActivityModel = require('mongoose-activitylogs/activity-model');
const Hospital = require('../models/hospital');
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
        .find({ collectionType: 'User' })

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
        });

      // let datas = [];
      // let temp = [];
      // result.forEach((el, idx, arr) => {
      //   if (el.referenceDocument._id == hospitalSupplyId) {
      //     temp.push(el);
      //   }
      // });
      
      // temp.forEach((el, idx, arr) => {
      //   let obj = {};
      //   obj.name = el.referenceDocument.product.name;
      //   if (el.action == 'created') {
      //     obj.demand_before = 0;
      //     obj.demand_after = el.referenceDocument.demand;
      //     obj.description = el.action;
      //   }
      //   else if (el.action == 'updated') {
      //     obj.demand_before = arr[idx-1].referenceDocument.demand;
      //     obj.demand_after = el.referenceDocument.demand;
      //     obj.description = el.action;
      //   }
      //   else {
      //     obj.demand_before = arr[idx-1].referenceDocument.demand;
      //     obj.demand_after = 0;
      //     obj.description = el.action;
      //   }
      //   datas.push(obj);
      // });
      
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

  static async getRecordsHospitalSuppliesByHospitalId(req, res, next) {
    try {
      const { hospitalId } = req.params;
      
      const hospitalData = await Hospital
        .findById(hospitalId);
      if (!hospitalData) {
        next({
          code: 404,
          message: 'There is no hospital',
        });
      }

      const records = await ActivityModel
        .find()
        .where('referenceDocument._id')
        .in(hospitalData.supplies)
        .populate({
          path: 'referenceDocument.product',
          model: 'Product'
        })
      // let datas = ActivityRecordsController.groupById(records)
      // Object.keys(datas).forEach(key => {
      //   var objKeys = {
      //     [key]: []
      //   }
      //   datas[key].forEach((el, idx, arr) => {
      //     let obj = {};
      //     obj.name = el.referenceDocument.product.name;

      //     if (el.action == 'Created') {
      //       obj.demand_before = 0;
      //       obj.demand_after = el.referenceDocument.demand;
      //       obj.description = 'ditambahkan';
      //     }
      //     else if (el.action == 'Updated') {
      //       obj.demand_before = arr[idx-1].referenceDocument.demand;
      //       obj.demand_after = el.referenceDocument.demand;
      //       obj.description = 'diubah'
      //     }
      //     else {
      //       obj.demand_before = arr[idx-1].referenceDocument.demand;
      //       obj.demand_after = 0;
      //       obj.description = 'dihapus'
      //     }
      //     objKeys[key].push(obj)
      //   })
      //   result.push(objKeys)
      // })

      res.json(records);
          
    } catch (err) {
      next(err);
    }
  }

  static groupById (data) {
    return data.reduce((r, a) => {
      r[a.referenceDocument.product.name] = [...r[a.referenceDocument.product.name] || [], a];
      return r;
    }, {});
  }
}

module.exports = ActivityRecordsController;