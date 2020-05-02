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
      const { productId } = req.params;
      await ActivityModel
        .find({ collectionType: "Hospital Supply" }, function(err, result){

          let datas = [];
          result.forEach(el => {
            if (el.referenceDocument.product == productId)
              datas.push(el);
          })

          if (!result) {
            next({
              code: 404,
              message: 'There is no hospital supplies',
            });
          }

          res.json(datas);
      });
      
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ActivityRecordsController;