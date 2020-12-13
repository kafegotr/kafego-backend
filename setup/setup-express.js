import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import expressSession from 'express-session';
import jwt, { verify } from 'jsonwebtoken';
import {
  ApolloServer,
  AuthenticationError,
} from 'apollo-server-express';
import isAuth from '../middlewares/auth';
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../graphql/constants';

import typeDefs from '../graphql/schema';
import resolvers from '../graphql/resolvers';
import models from '../models/sql';

// auth
import { generateUserModel } from '../middlewares/isAuth';

export const initializeExpressApp = () => {
  const app = express();

  app.set('views', path.join(__dirname, ''));
  app.set('view engine', 'jade');

  const corsOptions = {
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
    ],
    credentials: true,
    optionsSuccessStatus: 200,
  };

  app.use(cors(corsOptions));
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use(
    expressSession({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: true,
    }),
  );

  const getMe = async (req) => {
    const token = req.cookies['refresh-token'];
    if (token) {
      try {
        return await jwt.verify(token, REFRESH_TOKEN_SECRET);
      } catch (e) {
        throw new AuthenticationError(
          'Your session expired. Sign in again.',
        );
      }
    }
  };

  const server = new ApolloServer({
    introspection: true,
    typeDefs,
    resolvers,
    context: async ({ req, res }) => {
      const me = getMe(req);
      return {
        me,
        res,
        req,
        User: generateUserModel({ req }),
      };
    },
  });

  server.applyMiddleware({
    app,
    cors: {
      credentials: true,
      origin: [
        'http://localhost:3000',
        'http://localhost:3001',
      ],
    },
    path: '/graphql',
  });

  return app;
};
