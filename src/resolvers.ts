import { GraphQLError } from "graphql"
import { AppDataSource } from "./database/initDB"



const typeDefs = `#graphql

type Query {
    greeting:String
}
`

export const resolvers  = {

    Query: {
        greeting: () => "Hello World"
    }
}