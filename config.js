const config = {

    CORS_WHITELIST: ['*'],
    API_PORT: process.env.PORT || 3000,
    GRAPHQL_ENDPOINT: '/graphql',
    GRAPHQL_MODEL_ENDPOINT: '/model',
    MONGO_USERNAME: 'study-inspired',
    MONGO_PASSWORD: 'a0eBqAG0yl42l6ga',

};
config.MONGO_URI = `mongodb+srv://${config.MONGO_USERNAME}:${config.MONGO_PASSWORD}@cluster0-wotdd.mongodb.net/todo-app?retryWrites=true&w=majority`;


export default config;
