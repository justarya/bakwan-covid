const Hospital = require('../models/hospital');
const defaultSelection = 'name contact_number email location';

class HospitalController {
  static async createHospital(req, res, next) {
    try {
      const {
        name,
        contact_number,
        email,
        location,
      } = req.body;
      const { _id: userId } = req.payload;
      await Hospital.create({
        users: [userId],
        name,
        contact_number,
        email,
        location,
      });
      res
        .status(201)
        .json({
          name,
          contact_number,
          email,
          location,
        });
    } catch (err) {
      next(err);
    }
  }

  static async getAllHospital(req, res, next) {
    try {
      const hospitalList = await Hospital
        .find()
        .populate('supplies')
        .select(`${defaultSelection} supplies`);

      res
        .json({
          list: hospitalList,
        });
    } catch (err) {
      next(err);
    }
  }

  static async getHospital(req, res, next) {
    try {
      const { hospitalId } = req.params;
      const hospitalData = await Hospital
        .findById(hospitalId)
        .populate('supplies')
        .select(`${defaultSelection} supplies`);

        if (!hospitalData.name) {
          next({
            code: 404,
            message: 'Hospital Not found',
          });
        }

        res
          .json(hospitalData);
    } catch (err) {
      next(err);
    }
  }
  static async editHospital(req, res, next) {
    try {
      const {
        name,
        contact_number,
        email,
        location,
      } = req.body;
      const { hospitalId } = req.params;
      const hospitalData = await Hospital
        .findByIdAndUpdate(hospitalId, {
          name,
          contact_number,
          email,
          location,
        }, {
          new: true,
          runValidators: true,
          context: 'query',
        })
        .select(defaultSelection);

      if (!hospitalData.name) {
        next({
          code: 404,
          message: 'Hospital Not found',
        });
      }

      res
        .json(hospitalData);
      } catch (err) {
        next(err);
      }
    }
    static async deleteHospital(req, res, next) {
      try {
        const { hospitalId } = req.params;
        const { deletedCount } = await Hospital
          .deleteOne({ _id: hospitalId });

        if (!deletedCount) {
          next({
            code: 404,
            message: 'Hospital Not found',
          });
        }
        res
          .json({ success: true });

    } catch (err) {
      next(err);
    }
  }
}

module.exports = HospitalController;