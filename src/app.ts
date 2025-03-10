import express from 'express';
import { initAppDataSource } from './database/initDB';
import {createServer} from 'node:http';
import { resolvers } from './resolvers';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import cors from 'cors';
import bodyParser from 'body-parser';
import { expressMiddleware } from '@apollo/server/express4';
import { readFile } from 'node:fs/promises';
import { BaseContext } from '@apollo/server';

const app = express()
const port:number = 4000
const httpServer = createServer(app)

const initApp = async () => {
    
    const typeDefs = await readFile('./schema.graphql', 'utf8')
    if(typeDefs){
    
        const apolloServer = new ApolloServer<BaseContext>({
        typeDefs,resolvers, plugins: [ApolloServerPluginDrainHttpServer({httpServer})]})
        await apolloServer.start();
        app.use(cors())
        app.use(bodyParser.json())
        app.use('/graphql', expressMiddleware(apolloServer));
    }

    try {
        await initAppDataSource();
    } catch (error) {
        console.log(error)
        return -1
    }
    
    await httpServer.listen({port})
    console.log(`Server is listening on port `, httpServer.address())
}
initApp(); 


