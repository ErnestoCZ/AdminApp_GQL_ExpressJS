import { Resolvers } from "./generated/schema";
import AppDataSource from "./database/DataSource";
import { User } from "./database/Entities/User.entity";
import { GraphQLError } from "graphql";
import { BillingItem } from "./database/Entities/BillingItem.entity";
import { DeleteResult } from "typeorm";
import { Constant } from "./database/Entities/Constant.entity";

const UserRepository = AppDataSource.getRepository(User);
// const BillingRepository = AppDataSource.getRepository(Billing);
const BillingItemRepository = AppDataSource.getRepository(BillingItem);
const ConstantRepository = AppDataSource.getRepository(Constant);

export const resolvers: Resolvers = {
  Query: {
    Users: async (parent, { limit, offset }) => {
      const itemsQuery = UserRepository.createQueryBuilder().select("*");
      const totalCountQuery = UserRepository.createQueryBuilder()
        .select("user")
        .getCount();

      if (limit) {
        itemsQuery.limit(limit);
      }
      if (offset) {
        itemsQuery.offset(offset);
      }

      const [items, totalCount] = await Promise.all([
        itemsQuery.execute(),
        totalCountQuery,
      ]);
      return { items, totalCount };
    },
    User: async (parent, { userId }) => {
      const foundUser = await UserRepository.findOne({ where: { id: userId } });

      if (foundUser) {
        return foundUser;
      } else {
        throw new GraphQLError("User not found");
      }
    },
  },

  // STATUS: {
  //   ACTIVE: STATUS.ACTIVE,
  //   INACTIVE: STATUS.INACTIVE,
  // },
  // CONSTANT_TYPE: {},
  User: {
    billingsItems: async (parent) => {
      const billings = await BillingItemRepository.find({
        where: { user: { id: parent.id } },
      });
      return billings;
    },
  },
  Billing: {
    billingItems: async (User) => {
      const billingItems = await BillingItemRepository.find({
        where: { billing: { id: User.id } },
      });
      return billingItems;
    },
  },
  Mutation: {
    createUser: async (parent, { userData }): Promise<User> => {
      const findUser = UserRepository.findOneBy({ email: userData.email });
      const createUser = UserRepository.create(userData);
      const [foundUser, createdUser] = await Promise.all([
        findUser,
        createUser,
      ]);
      if (!foundUser) {
        return UserRepository.save(createdUser);
      } else {
        throw new GraphQLError("User already Exists");
      }
    },
    deleteUser: async (parent, { userId }) => {
      const deleteUserResponse: DeleteResult = await UserRepository.delete({
        id: userId,
      });
      console.log(deleteUserResponse);

      if (deleteUserResponse.affected && deleteUserResponse.affected >= 0) {
        return userId;
      } else {
        throw new GraphQLError("User not found");
      }
    },
    createConstant: async (parent, { constantData }) => {
      const newConstant = ConstantRepository.create(constantData);
      const res = await ConstantRepository.save(newConstant);

      return res;
    },
  },
};
