import { Router } from 'express';

import passport from 'passport';

import { Strategy as LocalStrategy } from 'passport-local';

const router = Router();

router.get('/', (req, res) => res.status(200).send(req.user));

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res
        .status(401)
        .send({
          code: 'unauthorized',
        })
        .end();
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        return next(loginError);
      }

      return res
        .status(200)
        .send({
          user,
        })
        .end();
    });
  })(req, res, next);
});

router.post('/logout', (req, res) => {
  req.logout();
  res.status(200).send({
    success: true,
  });
});

export default router;
