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
        uuid, role, email, username, password, firstname, lastname,
      },
    ) => await bcrypt.hash(password, 10, (err, hash) => {
      models.User.create({
        uuid: uuidv4().toString(),
        role,
        email,
        username,
        password: hash,
        firstname,
        lastname,
      });
      return true;
    }),
    login: async (parent, { username, password }, { res }) => {
      const user = await models.User.findOne({ where: { username } });
      if (!user) {
        throw new Error('No user with username');
      }
      const valid = bcrypt.compareSync(password, user.password);
      if (!valid) {
        throw new Error('Incorrect password');
      }
      const refreshToken = sign({ userId: user.uuid }, REFRESH_TOKEN_SECRET, {
        expiresIn: '7d',
      });
      const accessToken = sign({ userId: user.uuid }, ACCESS_TOKEN_SECRET, {
        expiresIn: '15min',
      });

      res.cookie('refresh-token', refreshToken);
      res.cookie('access-token', accessToken);

      return user;
    },

    logout: async (parent, { res }) => {
      // res.cookie.set('access-token', { expires: Date.now() });
      // req.logout();
      /*
      jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) console.log(err);
        return res.clearCookie('access-token');
      });
      */
      // res.cookie.set('access-token', { expires: Date.now() });
      // res.clearCookie('access-token');
      res.clearCookie('access-token');
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
