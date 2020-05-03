var ActivityModel = require('mongoose-activitylogs/activity-model');

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
}

module.exports = ActivityRecordsController;