const HospitalSupply = require('../models/hospitalSupply');
const Hospital = require('../models/hospital');
const HospitalRecords = require('../models/hospitalRecords');
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
    let detail = {};
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
      
      let data = await HospitalSupplyController.checkRecords(productId);
      if (data.length > 0) {
        let currentData = data[0];
        detail.demand_before = currentData.demand_after;
        detail.demand_after = Number(detail.demand_before) + Number(demand);
        detail.description = `increase ${demand}`;
      } else {
        detail.demand_before = 0;
        detail.demand_after = demand;
        detail.description = 'created new';
      }
        
      HospitalSupplyController.recordsData(detail, productId, hospitalId)

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
        hospitalId,
        hospitalSupplyId
      } = req.params;

      const {
        productId,
        demand,
      } = req.body;

      let dataProduct = await HospitalSupplyController.checkProduct(hospitalSupplyId, productId);
      HospitalSupplyController.classificationProduct(dataProduct, productId, demand, hospitalId);

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

      let detail = {};
      await HospitalSupplyController.checkProduct(hospitalSupplyId, false)
      .then(result => {
        detail.demand_before = result.changes.demand_after;
        detail.demand_after = result.changes.demand_after - result.demand;
        detail.description = `decrease ${ result.demand }`;

        HospitalSupplyController.recordsData(detail, result.product, hospitalId);
      })
      
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
  static async checkRecords(id) {
    let data = await HospitalRecords
      .find({ product: id })
      .sort({ createdAt: -1 })
    
    return data

  }
  static async checkProduct(hospitalSupplyId, newProductId) {
    let data = {};
    await HospitalSupply
      .findById(hospitalSupplyId)
      .then((result => {
        data = result;
        if (result.product == newProductId) 
          data.similar = true;
        else
          data.similar = false;
      }))

    if (!data.similar) {
      let result = await HospitalSupplyController.checkRecords(data.product);
      data.changes = result[0];
    }

    return data
  }
  static async classificationProduct(dataProduct, productId, demand, hospitalId) {
    let detail = {}; let currentData;
    let result = await HospitalSupplyController.checkRecords(productId);

    if (result.length > 0) {
      currentData = result[0];
      detail.demand_before = currentData.demand_after;
    }

    if (dataProduct.similar) {
      if (dataProduct.demand > demand) {
        detail.demand_after = detail.demand_before - (dataProduct.demand - demand);
        detail.description = `decrease ${ dataProduct.demand - demand }`;
      } else {
        detail.demand_after = detail.demand_before + (demand - dataProduct.demand);
        detail.description = `increase ${ demand - dataProduct.demand }`;
      }
    }
    else {
      let datachanged = {};
      if (result.length == 0) {
        let dataCurrent = await HospitalSupplyController.checkRecords(dataProduct.product);
          datachanged.demand_before = dataCurrent[0].demand_after;
          datachanged.demand_after = datachanged.demand_before - dataProduct.demand;
          datachanged.description = `decrease ${dataProduct.demand}`;
        await HospitalSupplyController.recordsData(datachanged, dataProduct.product, hospitalId);
          detail.demand_before = 0;
          detail.demand_after = demand;
          detail.description = 'created new';
      } else {
          datachanged.demand_before = dataProduct.changes.demand_after;
          datachanged.demand_after = dataProduct.changes.demand_after - dataProduct.demand;
          datachanged.description = `decrease ${dataProduct.demand}`;
        await HospitalSupplyController.recordsData(datachanged, dataProduct.product, hospitalId);
          detail.demand_after = Number(detail.demand_before) + Number(demand);
          detail.description = `increase ${ detail.demand_after - detail.demand_before }`;
      }
    }
    HospitalSupplyController.recordsData(detail, productId, hospitalId);

  }

  static async recordsData (detail, productId, hospitalId) {
    console.log(detail, productId, hospitalId)
    let result = {};
    await HospitalRecords
      .create({
        product: productId,
        demand_before: detail.demand_before,
        demand_after: detail.demand_after,
        description: detail.description,
      })
      .then(data => {
        console.log(data)
        result._id = data._id;
      })

    await Hospital
    .update({ _id: hospitalId }, {
      $push: {
        records: result._id
      }
    })
  }
}

module.exports = HospitalSupplyController;