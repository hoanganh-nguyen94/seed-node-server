import {GraphQLObjectType, GraphQLSchema} from "graphql";
import TaskSchema from "./taskSchema";
import CourseSchema from "./courseSchema";


const query = new GraphQLObjectType({
    name: 'Query',
    fields: () => {
        return {...TaskSchema.queries, ...CourseSchema.queries}
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

