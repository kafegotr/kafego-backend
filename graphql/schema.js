import { gql } from 'apollo-server-express';

const typeDefs = `
    scalar Date

    type User {
        uuid: ID!
        fullname: String!
        email: String!
        username: String!
        password: String!
        role: String!
        photo: String!
        createdAt: Date
        updatedAt: Date
        deletedAt: Date
    }

    type Address {
        id: ID!
        city: String! 
        county: String!
        users_uuid: String!
        createdAt: Date
        updatedAt: Date
        deletedAt: Date
    }

    type Contact {
        id: ID!
        gsm: String!
        tel: String!
        email: String!
        users_uuid: String! 
        createdAt: Date
        updatedAt: Date
        deletedAt: Date
    }

    type Fullness_percent {
        id: ID!
        percent: Int!
        timestamp: Date!
        users_uuid: String! 
        createdAt: Date
        updatedAt: Date
        deletedAt: Date
    }

    type LoginResponse {
        uuid: ID
        email: String
        role: String
        username: String
        password: String
    }

    type Query {
        users: [User!]
        user(uuid: ID!): User
    }

    type Mutation {
       register(
        uuid: ID
        email: String!
        username: String!
        password: String!
        role: String!
        photo: String!
        ): User!

        login(
            username: String!
            password: String!
        ): LoginResponse!

        logout: Boolean

    }
`;

export default typeDefs;
