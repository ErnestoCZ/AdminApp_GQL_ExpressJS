import { Resolvers, User } from "./generated/schema"


export const resolvers : Resolvers  = {
    Query: {

    },
    Mutation:{
        createUser: (parent, { userData }): User => {
            console.log(parent)
            return {id:'1', firstName: userData.firstName, lastName:userData.lastName, email:userData.email };
        },

    }
}