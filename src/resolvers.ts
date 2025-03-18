import { Resolvers , User} from "./generated/schema"
import AppDataSource from "./database/DataSource";
import { UserEntity } from "./database/Entities/User.entity";
import { GraphQLError } from "graphql";

const UserRepository = AppDataSource.getRepository(UserEntity)


export const resolvers : Resolvers  = {
    Query: {
        getUsers: async (parent) : Promise<UserEntity[]> => {
            return await UserRepository.createQueryBuilder().select('user').from(UserEntity,'user').getMany();
        }

    },
    Mutation:{
        createUser: async (parent, { userData }): Promise<UserEntity> => {
            
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
        // deleteUser: async (parent, {userID}) : Promise<> => {

        //     const user = UserRepository.findOneBy({id :userID.id});
        //     const [foundUser] = await Promise.all([user]);


        //     if(!foundUser){
        //         throw new GraphQLError('User not found');
        //     }
        //     else{
        //         return await UserRepository.createQueryBuilder().delete().from(UserEntity).where("id = :id", {id: userID.id}).execute();
        //     }

        //     return {} as UserEntity;
        // }


    }
}