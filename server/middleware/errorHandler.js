// eslint-disable-next-line no-unused-vars
const errorHandler = (err, _, res, __) => {
  if (err.name === 'ValidationError') {
    const validation = [];
    err.errors.forEach((key) => {
      if (err.errors[key].kind === 'unique') {
        validation.push(`${err.errors[key].path} has already been taken!`);
      } else {
        validation.push(err.errors[key].message);
      }
    });
    res.status(400).json({
      code: 400,
      message: validation,
    });
  } else if (err.message === 'Username / password cannot be empty') {
    res.status(400).json({
      code: 400,
      message: [err.message],
    });
  } else if (err.message === 'Wrong username / password') {
    res.status(404).json({
      code: 404,
      message: [err.message],
    });
  } else if (err.message === 'invalid token') {
    res.status(401).json({
      code: 401,
      message: [err.message],
    });
  } else if (err.message === 'Unauthorize') {
    res.status(401).json({
      code: 401,
      message: [err.message],
    });
  } else if (
    err.message === 'jwt must be provided'
      || err.message === 'jwt malformed'
      || err.message === 'invalid signature'
      || err.message === 'jwt signature is required'
  ) {
    res.status(401).json({
      code: 401,
      message: ['Cannot authenticate'],
    });
  } else if (err.code) {
    if (Array.isArray(err.message)) {
      res.status(err.code).json({
        ...err,
      });
    } else {
      res.status(err.code).json({
        code: err.code,
        message: [err.message],
      });
    }
  } else {
    res.status(500).json({
      code: 500,
      message: ['Internal server error :('],
    });
  }
  console.log(JSON.stringify(err, null, 2));
};

module.exports = errorHandler;
