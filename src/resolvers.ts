import { Resolvers , UserList , User as GQLUser, BillingList} from "./generated/schema"
import AppDataSource from "./database/DataSource";
import { User } from "./database/Entities/User.entity";
import { GraphQLError } from "graphql";
import { Billing } from "./database/Entities/Billing.entity";
import { SelectQueryBuilder } from "typeorm";
import { BillingItem } from "./database/Entities/BillingItem.entity";

const UserRepository = AppDataSource.getRepository(User)
const BillingRepository = AppDataSource.getRepository(Billing)
const BillingItemRepository = AppDataSource.getRepository(BillingItem)

export const resolvers : Resolvers  = {
    Query: {
        testQuery: async (parent, {limit}) => {
            const userQuery = AppDataSource.createQueryBuilder().select('*').from(User, 'user');
            if(limit){
                userQuery.limit(limit);
            }
            return await userQuery.execute();

        },
        getUsers: async (parent, {limit,offset}) => {
            const itemsQuery =  UserRepository.createQueryBuilder().select('user').from(User,'user');
            const totalCountQuery =  UserRepository.createQueryBuilder().select('user').getCount();
            
            if(limit){
                itemsQuery.limit(limit)
            }
            if(offset){
                itemsQuery.offset(offset)
            }

            const [items, totalCount] = await Promise.all([itemsQuery.execute(), totalCountQuery])
            return {items, totalCount};
        },
        getBillings: async (parent, {limit,offset}) => {
            const itemsQuery = BillingRepository.createQueryBuilder().select('billing').from(Billing, 'billing')
            const totalCountQuery = BillingRepository.createQueryBuilder().select('billing').getCount();

            if(limit){
                itemsQuery.limit(limit)
            }
            if(offset){
                itemsQuery.offset(offset)
            }

            const [items, totalCount] = await Promise.all([itemsQuery.execute(),totalCountQuery]);
            return {items,totalCount};
        },
        getBillingItems: async (parent) => {

            const query = await AppDataSource.createQueryBuilder().leftJoin('billingitem.user', 'user').from(BillingItem,'billingitem').getMany()
            console.log(query)
            return query;

        }
        



    },
    Mutation:{
        createUser: async (parent, { userData }): Promise<User> => {
            const findUser = UserRepository.findOneBy({email: userData.email});
            const createUser = UserRepository.create(userData);
            const [foundUser, createdUser] = await Promise.all([findUser,createUser]);
            if(!foundUser){
                return UserRepository.save(createUser);
            }
            else{
                throw new GraphQLError("User already Exists");
            }
        },

        // deleteUser: async (parent, {userID})  => {

        //     const user = UserRepository.findOneBy({id :userID.id});
        //     const [foundUser] = await Promise.all([user]);


        //     if(!foundUser){
        //         throw new GraphQLError('User not found');
        //     }
        //     else{
        //         return await UserRepository.createQueryBuilder().delete().from(UserEntity).where("id = :id", {id: userID.id}).execute();
        //     }

        //     return {} as User;
        // }


    }
}