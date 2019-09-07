import express from 'express';
import mongoose from 'mongoose';
import http from 'http';
import config from './config';
import graphqlHTTP from 'express-graphql';
import cors from 'cors';
import GraphqlSchema from "./graphql/graphqlSchema";

const app = express();
app.use('*', cors());
app.use('/graphql', cors(), graphqlHTTP({
    schema: GraphqlSchema,
    rootValue: global,
    graphiql: true,
}));

const server = http.createServer(app);

mongoose.connect(config.MONGO_URI, {promiseLibrary: require('bluebird'), useNewUrlParser: true})
    .then(() => console.log('connection successful'))
    .catch((err) => console.error(err));

server.listen(config.API_PORT, () => {
    console.log(`🚀 Go to http://localhost:${config.API_PORT}/graphql to run queries!`);
});
