import {DataSource, DataSourceOptions} from 'typeorm'
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";



export const AppDataSource : DataSource = new DataSource({
    host: 'localhost',
    port: 5432,
    type: 'postgres',
    username : 'root',
    password: '1234',
    database: 'admin_app',
    entities: [],
    migrations: [],
    synchronize: true
} as PostgresConnectionOptions)



export const initAppDataSource = async () => {
    return await AppDataSource.initialize();
}