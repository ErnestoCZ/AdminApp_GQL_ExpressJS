import {DataSource, DataSourceOptions} from 'typeorm'
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";


const  AppDataSource : DataSource = new DataSource({
    host: 'localhost',
    port: 5432,
    type: 'postgres',
    username : 'root',
    password: '1234',
    database: 'postgres',
    entities: [],
    migrations: [__dirname + "/**/migrations/*{.js,.ts}"],
    synchronize: false
} as PostgresConnectionOptions)


export default AppDataSource;