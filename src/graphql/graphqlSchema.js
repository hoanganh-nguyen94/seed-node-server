import TaskSchema from "./taskSchema";
import {GraphQLObjectType, GraphQLSchema} from "graphql";


const query = new GraphQLObjectType({
    name: 'Query',
    fields: () => {
        return {...TaskSchema.queries}
    }
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => {
        return {
            ...TaskSchema.mutations
        }
    }
});

const GraphqlSchema = new GraphQLSchema({query: query, mutation: mutation});
module.exports = GraphqlSchema;

