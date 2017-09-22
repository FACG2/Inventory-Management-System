const signUpHelper = require('../helpers/sign_up');

const post = (req, res, next) => {
  signUpHelper(req, res, next);
};

module.exports = {
  post
};
