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
        photo: String
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
        ok: Boolean
    }

    type TokenResponse {
        token: String
        refreshToken: String
        ok: String
        userRole: String
    }

    type RegisterResponse {
        uuid: ID
        username: String
        password: String
    }


    type Query {
        users: [User!]
        user: User
        token: TokenResponse
    }

    type Mutation {
       register(
        uuid: ID
        fullname: String!
        email: String!
        username: String!
        password: String!
        role: String
        photo: String
        ): User

       addressRegister(
        city: String
        county: String
        users_uuid: String
        ): Address

        login(
            username: String!
            password: String!
        ): LoginResponse

        loginBusiness(
            username: String!
            password: String!
        ): LoginResponse

        logout: Boolean

    }
`;

export default typeDefs;
