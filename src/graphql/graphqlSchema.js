import {GraphQLObjectType, GraphQLSchema} from "graphql";
import TaskSchema from "./taskSchema";
import CourseSchema from "./courseSchema";
import ApiSchema from "./apiBoilerplateSchema";


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
            ...TaskSchema.mutations, ...ApiSchema.mutations
        }
    }
});

const GraphqlSchema = new GraphQLSchema({query: query, mutation: mutation});
module.exports = GraphqlSchema;

