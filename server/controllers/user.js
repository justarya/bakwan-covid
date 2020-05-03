const User = require('../models/user');
const Hospital = require('../models/hospital');
const { comparePassword } = require('../helper/bcryptjs');
const { jwtHash } = require('../helper/jwt');

class UserController {
  static signUp(req, res, next) {
    const {
      username,
      password,
    } = req.body;

    const payload = {
      username,
      password,
    };

    User
      .create(payload)
      .then((data) => {
        const token = {
          _id: data._id,
          username,
          role: data.role,
        };
        res.status(201).json({
          token: jwtHash(token),
          _id: data._id,
          username,
        });
      })
      .catch(next);
  }

  static signIn(req, res, next) {
    const {
      username,
      password,
    } = req.body;
    if (!username || !password) {
      next({
        message: 'Username / password cannot be empty',
      });
    } else {
      User
        .findOne({ username })
        .then((result) => {
          if (result) {
            if (comparePassword(password, result.password)) {
              const { _id, role } = result;
              const payload = {
                _id,
                username,
                role,
              };
              res.status(200).json({
                token: jwtHash(payload),
                username,
                role,
              });
            } else {
              next({
                message: 'Wrong username / password',
              });
            }
          } else {
            next({
              message: 'Wrong username / password',
            });
          }
        })
        .catch(next);
    }
  }

  static async getUser(req, res, next) {
    try {
      const { _id } = req.payload;
      const { username, role } = await User
        .findById(_id);
      const HospitalData = await Hospital
        .find({ users: _id }, 'name');

      res
        .status(200)
        .json({
          username,
          role,
          hospitals: HospitalData,
        });
    } catch (err) {
      next(err);
    }
  }

  static async editUser(req, res, next) {
    try {
      const { userId } = req.params;
      const { username, password } = req.body;
      await User
        .findByIdAndUpdate(userId, {
          username, password,
        }, {
          new: true,
          runValidators: true,
          context: 'query',
        });

      res
        .status(200)
        .json({
          username,
        });
    } catch (err) {
      next(err);
    }
  }

  static decode(req, res) {
    res.status(200).send(req.payload._id);
  }
}

module.exports = UserController;
