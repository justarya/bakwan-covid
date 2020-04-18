const mongoose = require('mongoose');

// Reuse the connection.
let isConnected;

/**
 * Connect to Mongodb.
 * @param done Callback to notify the result.
 * @returns {*}
 */
const connect = (done) => {
  console.log('isConnected', isConnected);
  if (isConnected) return done();

  mongoose.connect(process.env.ATLAS_CLUSTER, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      isConnected = true;
      done();
    })
    .catch(done);
};

/**
 * Middleware to connect to database before execute a controller.
 * @param req  ExpressJS Request.
 * @param res  ExpressJS Response.
 * @param next Callback to notify when its done.
 */
module.exports.connect = (req, res, next) => {
  connect(next);
};
