const Hospital = require('../models/hospital');

const isAdmin = (role = false) => {
  if (role === 1) return true;
  return false;
};

class Authorization {
  static adminOnly(req, res, next) {
    if (isAdmin(req.payload.role)) next();
    else {
      next({
        code: 401,
        message: 'Unauthorize',
      });
    }
  }

  static async userWithHospitalAccess(req, res, next) {
    try {
      const { hospitalId } = req.params;
      const { _id: userId, role: userRole } = req.payload;
      const result = await Hospital
        .findOne({ _id: hospitalId, users: userId });

      console.log(result, userId, req.params);
      if (result || isAdmin(userRole)) next();
      else {
        next({
          code: 401,
          message: 'Unauthorize',
        });
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Authorization;