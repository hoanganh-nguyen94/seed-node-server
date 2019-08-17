import config from './config';
import {ApolloServer, gql} from 'apollo-server';
import mongoose from 'mongoose';

const books = [
    {
        title: 'Harry Potter and the Chamber of Secrets',
        author: 'J.K. Rowling',
    },
    {
        title: 'Jurassic Park',
        author: 'Michael Crichton',
    },
];


const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`;


const resolvers = {
    Query: {
        books: () => books,
    },
};


const server = new ApolloServer({typeDefs, resolvers});


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
