import config from './config';
import {ApolloServer, gql} from 'apollo-server';
import mongoose from 'mongoose';
import {taskCtr} from "./mongodb/controllers/task";

const taskSchema = require('./graphql/taskSchema');

const books = [
    {
        description: 'Harry Potter and the Chamber of Secrets',
        status: 'J.K. Rowling',
    },
    {
        description: 'Jurassic Park',
        status: 'Michael Crichton',
    },
];


const typeDefs = gql`
  type Task {
    description: String
    status: String
  }

  type Query {
    tasks: [Task]
  }
`;


const resolvers = {
    Query: {
        tasks: async () => taskCtr.getTasks(),
    },
};


const server = new ApolloServer({
    schema: taskSchema,
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
