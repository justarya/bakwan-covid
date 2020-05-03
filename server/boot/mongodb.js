const mongoose = require('mongoose');

// Reuse the connection.
let isConnected;

/**
 * Connect to Mongodb.
 * @param done Callback to notify the result.
 * @returns {*}
 */
const connectToDatabase = async (done) => {
  try {
    console.log('isConnected', isConnected);
    if (isConnected) return done();

    await mongoose.connect(process.env.ATLAS_CLUSTER, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    return done();
  } catch (err) {
    return done(err);
  }
};

/**
 * Middleware to connect to database before execute a controller.
 * @param req  ExpressJS Request.
 * @param res  ExpressJS Response.
 * @param next Callback to notify when its done.
 */
module.exports.connect = (req, res, next) => {
  connectToDatabase(next);
};
