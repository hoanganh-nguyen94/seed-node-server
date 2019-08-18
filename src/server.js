import config from './config';
import {ApolloServer} from 'apollo-server';
import mongoose from 'mongoose';
import TaskSchema from "./graphql/taskSchema";

const server = new ApolloServer({
    schema: TaskSchema,
    rootValue: global,
    graphiql: true,
});


mongoose.set('useFindAndModify', false);

mongoose
    .connect(config.MONGO_URI, {useNewUrlParser: true, autoIndex: false})
    .then(async () => {

        console.log(`MongoDb is running`);

        server.listen(config.API_PORT).then(({url}) => {
            console.log(`🚀  Server ready at ${url}`);
        });

    });

mongoose.connection.on('error', err => {
    console.log(err);
});
