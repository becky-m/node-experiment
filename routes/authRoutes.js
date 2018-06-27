const passport = require('passport');

//export these functions into some other location (likely index.)
module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get('/auth/google/callback', passport.authenticate('google'));

  app.get('api/logout', (req, response) => {
    req.logout();
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
