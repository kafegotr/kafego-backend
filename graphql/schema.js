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
        menu: String
        campaigns: String
        address_direct: String
        createdAt: Date
        updatedAt: Date
        deletedAt: Date
    }

    type Address {
        id: ID
        city: String
        county: String
        users_uuid: String
        createdAt: Date
        updatedAt: Date
        deletedAt: Date
    }

    type Menu {
        menu: String
        campaigns: String
        users_uuid: String
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
        percent: String
        users_uuid: String
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

    type Query {
        users: [User!]
        user: User
        token: TokenResponse
        addresses: Address
        allAddresses: [Address]
        fullness_percent: Fullness_percent
        all_fullness_percent: [Fullness_percent]
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
        user_uuid: String
        ): Address

       menuRegister(
        menu: String
        campaigns: String
        user_uuid: String
        ): Menu

       fullnessPercentUpdate (
        id: ID
        percent: String
        user_uuid: String
        ): Fullness_percent

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
