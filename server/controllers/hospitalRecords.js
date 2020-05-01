const Hospital = require('../models/hospital');
const selection = 'name -_id'

class HospitalRecordsController {
  static async getAllHospitalRecords(req, res, next) {
    try {
      const { hospitalId } = req.params;
      const hospitalRecordsList = await Hospital
        .findById(hospitalId)
        .populate({
          path: 'records',
          populate: {
            path: 'product',
            select: selection
          }
        })
        .sort({ createdAt: -1 })

      const result = HospitalRecordsController.groupBy(hospitalRecordsList.records)

      res
        .json(result);
    } catch (err) {
      next(err);
    }
  }

  static groupBy (data) {
    return data.reduce((r, a) => {
      r[a.product.name] = [...r[a.product.name] || [], a];
      return r;
     }, {});
  }
}

module.exports = HospitalRecordsController;