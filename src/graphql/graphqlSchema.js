import {GraphQLObjectType, GraphQLSchema} from "graphql";
import TaskSchema from "./taskSchema";
import IssueSchema from "./issueSchema";


const query = new GraphQLObjectType({
    name: 'Query',
    fields: () => {
        return {...TaskSchema.queries, ...IssueSchema.queries}
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

