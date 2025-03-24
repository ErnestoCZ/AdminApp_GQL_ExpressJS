import {DataSource, DataSourceOptions} from 'typeorm'
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { User } from './Entities/User.entity';
import { BillingItem } from './Entities/BillingItem.entity';
import { Billing } from './Entities/Billing.entity';


const AppDataSource : DataSource = new DataSource({
    host: 'localhost',
    port: 5432,
    type: 'postgres',
    username : 'root',
    password: '1234',
    database: 'postgres',
    entities: [User, BillingItem, Billing],
    migrations: [__dirname + "/**/migrations/*{.js,.ts}"],
    synchronize: true
} as PostgresConnectionOptions)


export default AppDataSource;