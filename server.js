const {ApolloServer, gql} = require('apollo-server');
let port = 3000;


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


server.listen(port).then(({url}) => {
    console.log(`🚀  Server ready at ${url}`);
});

