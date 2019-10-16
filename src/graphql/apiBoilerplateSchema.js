import {GraphQLBoolean, GraphQLObjectType, GraphQLString} from "graphql";


const apiResponseType = new GraphQLObjectType({
    name: 'ApiResponse',
    fields: () => {
        return {
            success: {type: GraphQLBoolean},
            result: {type: GraphQLString}
        }
    }
});

const ApiSchema = {

    mutations: {
        apiSuccess: {
            type: apiResponseType,
            resolve: async () => {
                return {
                    success: true,
                    result: 'Api success!'
                };
            }
        },
        apiError: {
            type: apiResponseType,
            resolve: async () => {
                return new Error('Api error!');
            }
        },
    }
};

export default ApiSchema;

