const ActivityModel = require('mongoose-activitylogs/activity-model');
const Hospital = require('../models/hospital');

class ActivityRecordsController {

  static async getAllRecordsHospital(req, res, next) {
    try {
      await ActivityModel
        .find({ collectionType: "Hospital" }, function(err, result){
          
        if (!result) {
          next({
            code: 404,
            message: 'There is no hospital',
          });
        }

        res.json(result);
      });
      
    } catch (err) {
      next(err);
    }
  }

  static async getAllRecordsProducts(req, res, next) {
    try {
      await ActivityModel
        .find({ collectionType: "Product" }, function(err, result){
          
        if (!result) {
          next({
            code: 404,
            message: 'There is no product',
          });
        }

        res.json(result);
      });
      
    } catch (err) {
      next(err);
    }
  }

  static async getAllRecordsUsers(req, res, next) {
    try {
      await ActivityModel
        .find({ collectionType: "User" }, function(err, result){

        if (!result) {
          next({
            code: 404,
            message: 'There is no user',
          });
        }

        res.json(result);
      });
      
    } catch (err) {
      next(err);
    }
  }

  static async getAllRecordsHospitalSupplies(req, res, next) {
    try {
      await ActivityModel
        .find({ collectionType: "Hospital Supply" }, function(err, result){

        if (!result) {
          next({
            code: 404,
            message: 'There is no hospital supplies',
          });
        }

        res.json(result);
      });
      
    } catch (err) {
      next(err);
    }
  }

  static async getRecordsHospitalSuppliesByProduct(req, res, next) {
    try {
      const { hospitalSupplyId } = req.params;
      await ActivityModel
        .find({ collectionType: "Hospital Supply" })
        .populate({
          path: 'referenceDocument.product',
          model: 'Product'
        })
        .then(result => {
          let datas = [];
          let temp = [];
          result.forEach((el, idx, arr) => {
            if (el.referenceDocument._id == hospitalSupplyId) {
              temp.push(el)
            }
          })
          
          temp.forEach((el, idx, arr) => {
            let obj = {};
            obj.name = el.referenceDocument.product.name;
              if (el.action == 'Created') {
                obj.demand_before = 0;
                obj.demand_after = el.referenceDocument.demand;
                obj.description = 'ditambahkan';
              }
              else if (el.action == 'Updated') {
                obj.demand_before = arr[idx-1].referenceDocument.demand;
                obj.demand_after = el.referenceDocument.demand;
                obj.description = 'diubah'
              }
              else {
                obj.demand_before = arr[idx-1].referenceDocument.demand;
                obj.demand_after = 0;
                obj.description = 'dihapus'
              }
              datas.push(obj);
          })
          
          if (!result) {
            next({
              code: 404,
              message: 'There is no hospital supplies',
            });
          }
          res.json(datas);
        })
    } catch (err) {
      next(err);
    }
  }

  static async getRecordsHospitalSuppliesByHospitalId(req, res, next) {
    let result = [];
    try {
      const { hospitalId } = req.params;
      
      let supplies = await Hospital
      .findById(hospitalId)
      .then(records => {
        if (!records) {
          next({
            code: 404,
            message: 'There is no hospital',
          });
        }

        return records.supplies
      })

      await ActivityModel
        .find()
        .where('referenceDocument._id')
        .in(supplies)
        .populate({
          path: 'referenceDocument.product',
          model: 'Product'
        })
        .then(records => {
          let datas = ActivityRecordsController.groupById(records)
          Object.keys(datas).forEach(key => {
            var objKeys = {
              [key]: []
            }
            datas[key].forEach((el, idx, arr) => {
              let obj = {};
              obj.name = el.referenceDocument.product.name;

              if (el.action == 'Created') {
                obj.demand_before = 0;
                obj.demand_after = el.referenceDocument.demand;
                obj.description = 'ditambahkan';
              }
              else if (el.action == 'Updated') {
                obj.demand_before = arr[idx-1].referenceDocument.demand;
                obj.demand_after = el.referenceDocument.demand;
                obj.description = 'diubah'
              }
              else {
                obj.demand_before = arr[idx-1].referenceDocument.demand;
                obj.demand_after = 0;
                obj.description = 'dihapus'
              }
              objKeys[key].push(obj)
            })
            result.push(objKeys)
          })

          res.json(result)  
        })
          
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