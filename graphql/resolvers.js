import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import jwt, { sign } from 'jsonwebtoken';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import slugify from 'slugify';
import models from '../models/sql';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from './constants';
import isAuth from '../middlewares/auth';

export default {
  Query: {
    users: async () => await models.User.findAll(),
    user: async (parent, { uuid }) => await models.User.findOne({ where: { uuid } }),
  },
  Mutation: {
    register: async (
      parent,
      {
        uuid, fullname, email, username, password, role, photo,
        city, county,
      }, { res },
    ) => {
      const user = await models.User.findOne({ where: { username } });
      // const user = await models.User.findOne({ email, username });
      if (user) {
        throw new Error('User already exits');
      }
      const newUser = await bcrypt.hash(password, 10, (err, hash) => {
        models.User.create({
          uuid: uuidv4().toString(),
          fullname,
          email,
          username,
          password: hash,
          role: 'private',
          photo,
        });
        return newUser;
      });
    },
    /*
    addressRegister: async (
      parent,
      {
        city, county, users_uuid,
      }, { res },
    ) => {
      await models.Address.create({
        city,
        county,
        users_uuid,
      });
      return newAddress;
    },
    */
    login: async (parent, { username, password }, { res }) => {
      const user = await models.User.findOne({ where: { username } });
      if (!user) {
        throw new Error('No user with username');
      }
      const valid = bcrypt.compareSync(password, user.password);
      if (!valid) {
        throw new Error('Incorrect password');
      }
      const refreshToken = jwt.sign({ userId: user.uuid }, REFRESH_TOKEN_SECRET, {
        expiresIn: '7d',
      });
      const token = jwt.sign({ username, password }, 'supersecret');
      const accessToken = jwt.sign({ userId: user.uuid }, ACCESS_TOKEN_SECRET, {
        expiresIn: '15min',
      });
      res.cookie('token', token, { maxAge: 60 * 60 * 24 * 7, httpOnly: true });
      res.cookie('refresh-token', refreshToken, { maxAge: 60 * 60 * 24 * 7, httpOnly: true });
      // res.cookie('access-token', token, { httpOnly: true, maxAge: 3600000 });
      // res.cookie('refresh-token', refreshToken, { httpOnly: true, maxAge: 3600000 });
      return user;
    },

    logout: async (parent, { res, req }) => {
      // res.cookie.set('access-token', { expires: Date.now() });
      // req.logout();
      /*
      jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) console.log(err);
        return res.clearCookie('access-token');
      });
      */
      // res.cookie.set('access-token', { expires: Date.now() });
      // res.cookie('token', { maxAge: Date.now(), httpOnly: true });
      res.clearCookie('token', { maxAge: Date.now(), httpOnly: true });
      return true;
    },
    /*
    postCreate: async (
      parent,
      {
        id, users_uuid, post_title, post,
      },
      context,
      // { req, session, me }
    ) => {
      console.log(context.userId);
      /*
      let validateToken;
      const token = context.cookies["refresh-token"];
      if (token) {
        try {
          return validateToken = await jwt.verify(token, REFRESH_TOKEN_SECRET);
        } catch (e) {
          throw new AuthenticationError("Your session expired. Sign in again.");
        }
      }
      if (!validateToken) {
        throw new Error("Not authenticated as user.");
      }
      */
    /*
      if (!context.userId) {
        throw new Error('Not authenticated as user.');
      }
      return await models.Post.create({
        id,
        users_uuid,
        post_title,
        post,
      });
    },
    postCreated: async (
      parent,
      {
        id, users_uuid, post_title, post,
      },
      { req, session, me },
    ) => await models.Post.create({
      id,
      users_uuid,
      post_title,
      post,
    }),
    */
  },
};
