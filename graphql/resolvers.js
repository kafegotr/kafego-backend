import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import jwt, { sign } from 'jsonwebtoken';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import slugify from 'slugify';
import jwt_decode from 'jwt-decode';
import models from '../models/sql';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from './constants';
import isAuth from '../middlewares/auth';

export default {
  Query: {
    token: async (parent, { uuid }, { req }) => {
      const { refreshToken, token } = req.cookies;
      let ok;
      if (refreshToken == null) ok = false;
      ok = true;
      if (refreshToken) {
        const userFind = jwt_decode(refreshToken);
        const { userRole } = userFind;
        return {
          token,
          refreshToken,
          ok,
          userRole,
        };
      }
      return {
        token,
        refreshToken,
        ok,
        userRole: 'null',
      };
    },
    addresses: async (parent, { uuid }, { req }) => {
      const { refreshToken, token } = req.cookies;
      if (refreshToken) {
        const userFind = jwt_decode(refreshToken);
        const { userId } = userFind;
        return await models.Address.findOne({ where: { users_uuid: userId } });
      }
      return null;
    },
    users: async () => await models.User.findAll(),
    allAddresses: async () => await models.Address.findAll(),
    all_fullness_percent: async () => await models.Fullness_percent.findAll(),
    user: async (parent, { uuid }, { req }) => {
      const token = req.cookies.refreshToken;
      if (token) {
        const userFind = jwt_decode(token);
        const { userId, userRole } = userFind;
        return await models.User.findOne({ where: { uuid: userId, role: userRole } });
      }
    },
    fullness_percent: async (parent, { uuid }, { req }) => {
      const token = req.cookies.refreshToken;
      if (token) {
        const userFind = jwt_decode(token);
        const { userId, userRole } = userFind;
        return await models.Fullness_percent.findOne({ where: { users_uuid: userId } });
      }
    },
  },
  Mutation: {
    register: async (
      parent,
      {
        uuid, fullname, email, username, password, role, photo, menu, campaigns,
      }, { res },
    ) => {
      try {
        const user = await models.User.findOne({ where: { username } });
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
            menu,
            campaigns,
          });
          return newUser;
        });
      } catch (err) {
        console.log(err);
      }
    },
    addressRegister: async (
      parent,
      {
        city, county, user_uuid,
      }, { res, req },
    ) => {
      const token = req.cookies.refreshToken;
      if (token) {
        const userFind = jwt_decode(token);
        const { userId, userRole } = userFind;
        const users_uuid = userId;
        const isControl = await models.Address.findOne({ where: { users_uuid } });
        if (isControl) {
          const cities = city;
          const counties = county;
          const values = { city: cities, county: counties };
          const selector = {
            where: { users_uuid: userId },
          };
          return await models.Address.update(values, selector)
            .then(() => {
            });
        }
        return await models.Address.create({
          city: 'İstanbul',
          county: 'Beşiktaş',
          users_uuid: userId,
        });
      }
      return newAddress;
    },
    fullnessPercentUpdate: async (
      parent,
      {
        id, percent, user_uuid,
      }, { res, req },
    ) => {
      const token = req.cookies.refreshToken;
      if (token) {
        const userFind = jwt_decode(token);
        const { userId, userRole } = userFind;
        const users_uuid = userId;
        const isControl = await models.Fullness_percent.findOne({ where: { users_uuid } });
        console.log(isControl);
        if (isControl) {
          const percents = percent;
          const values = { percent: percents };
          const selector = {
            where: { users_uuid: userId },
          };
          return await models.Fullness_percent.update(values, selector)
            .then(() => {
            });
        }
        return await models.Fullness_percent.create({
          percent,
          users_uuid: userId,
        });
      }
      return fullnessPercent;
    },
    login: async (parent, { username, password }, { res }) => {
      const user = await models.User.findOne({ where: { username } });
      const { dataValues } = user;
      const roleStatus = dataValues.role;
      if (!user || roleStatus === 'business') {
        throw new Error('No user with username');
      }
      const valid = bcrypt.compareSync(password, user.password);
      if (!valid) {
        throw new Error('Incorrect password');
      }
      const refreshToken = jwt.sign({ userId: user.uuid, userRole: user.role },
        REFRESH_TOKEN_SECRET, {
          expiresIn: '7d',
        });
      const token = jwt.sign({ userId: user.uuid }, ACCESS_TOKEN_SECRET, {
        expiresIn: '15min',
      });
      res.cookie('refreshToken', refreshToken, { maxAge: 36000000, httpOnly: true });
      res.cookie('token', token, { maxAge: 60 * 60 * 24 * 7, httpOnly: true });
      let ok;
      if (refreshToken == null) ok = false;
      ok = true;
      return {
        user,
        ok,
      };
    },
    loginBusiness: async (parent, { username, password }, { res }) => {
      const user = await models.User.findOne({ where: { username } });
      const { dataValues } = user;
      const roleStatus = dataValues.role;
      if (!user || roleStatus === 'private') {
        throw new Error('No user with username');
      }
      const valid = bcrypt.compareSync(password, user.password);
      if (!valid) {
        throw new Error('Incorrect password');
      }
      const refreshToken = jwt.sign({ userId: user.uuid, userRole: user.role },
        REFRESH_TOKEN_SECRET, {
          expiresIn: '7d',
        });
      const token = jwt.sign({ userId: user.uuid }, ACCESS_TOKEN_SECRET, {
        expiresIn: '15min',
      });
      res.cookie('refreshToken', refreshToken, { maxAge: 36000000, httpOnly: true });
      res.cookie('token', token, { maxAge: 60 * 60 * 24 * 7, httpOnly: true });
      let ok;
      if (refreshToken == null) ok = false;
      ok = true;
      return {
        user,
        ok,
      };
    },
    logout: async (parent, { uuid }, { res, req }) => {
      const { refreshToken, token } = req.cookies;
      res.cookie('refreshToken', refreshToken, { maxAge: 0, httpOnly: true });
      return true;
    },
    menuRegister: async (
      parent,
      {
        menu, campaigns, user_uuid,
      }, { res, req },
    ) => {
      const token = req.cookies.refreshToken;
      if (token) {
        const userFind = jwt_decode(token);
        const { userId, userRole } = userFind;
        const menus = menu;
        const campaignss = campaigns;
        const values = { menu: menus, campaigns: campaignss };
        const selector = {
          where: { uuid: userId },
        };
        return await models.User.update(values, selector)
          .then(() => {
            console.log('Menu changed');
          });
      }
      return menuRegister;
    },
  },
};
