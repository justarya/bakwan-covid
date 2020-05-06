const Hospital = require('../models/hospital');

const defaultSelection = 'name contact_numbers email location';

class HospitalController {
  static async createHospital(req, res, next) {
    try {
      const users = [];
      const {
        userId,
        name,
        contact_numbers,
        email,
        location,
      } = req.body;
      const fromAuthDecode = req.payload;
      if (fromAuthDecode.role !== 1) {
        const hospitalWithThisUser = await Hospital.find({ users: fromAuthDecode._id });
        if (hospitalWithThisUser.length) {
          next({
            code: 401,
            message: 'Hospital cannot created more than once',
          });
        }
        users.push(fromAuthDecode._id);
      } else {
        users.push(userId);
      }
      await Hospital.create({
        users,
        name,
        contact_numbers,
        email,
        location,
      });
      res
        .status(201)
        .json({
          name,
          contact_numbers,
          email,
          location,
        });
    } catch (err) {
      next(err);
    }
  }

  static async getAllHospital(req, res, next) {
    try {
      let filter = {};
      if (req.query.search) {
        const regex = new RegExp(req.query.search, 'i');
        filter = {
          $or: [
            { name: regex },
            { location: regex },
          ],
        };
      }
      const pagination = {
        size: Number(req.query.size) || 20,
        page: Number(req.query.page) || 0,
      };
      const hospitalList = await Hospital
        .find(filter)
        .limit(pagination.size)
        .skip(pagination.size * pagination.page)
        .populate({
          path: 'supplies',
          options: {
            sort: {
              demand: -1,
            },
          },
          populate: {
            path: 'product',
          },
        })
        .sort({ updatedAt: -1 })
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
        .populate({
          path: 'supplies',
          options: {
            sort: {
              demand: -1,
            },
          },
          populate: {
            path: 'product',
          },
        })
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
        contact_numbers,
        email,
        location,
      } = req.body;
      const { hospitalId } = req.params;
      const hospitalData = await Hospital
        .findByIdAndUpdate(hospitalId, {
          name,
          contact_numbers,
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
