function validateRegistration (req, res, callback) {
  req.checkBody('username', 'Username field cannot be empty.').notEmpty();
  req.checkBody('username', 'Username must be between 4-20 characters long.').len(4, 20);
  req.checkBody('email', 'The email you entered is invalid ,please try again').isEmail();
  req.checkBody('email', 'Email must be between 4-100 characters long,please try again.').len(4, 100);
  // req.checkBody('password', 'Password must be between 8-100 characters long.').len(8, 100);
  // req.checkBody('password', 'Password must inclue one lowercase character , one uppercase character ,a number').matches(/^(?=.+\d)(?=.+[a-z])(?=.+[A-Z])(?!.+)(?=.+[*a=zA-Z0-9]).{8,}$/, 'i');
  // req.checkBody('confirmPassword', 'Password must be between 8-100 characters long.').len(8, 100);
  // req.checkBody('confirmPassword', 'Passwords do not match ,please try again.').equals(req.body.password);

  const errors = req.validatorErrors();
  if (errors) {
    console.log(`errors:${JSON.stringify(errors)}`);
    res.render('register', {
      title: 'Registration Error',
      errors: errors
    });
  } else {
    console.log('req.body.username');
    console.log('req.body.email');
    console.log('req.body.password');
  }
}

module.exports = validateRegistration;
