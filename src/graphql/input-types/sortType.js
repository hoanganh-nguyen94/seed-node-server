import {GraphQLInputObjectType, GraphQLString} from "graphql";

export const sortType = new GraphQLInputObjectType({
    name: 'Sort',
    fields: () => {
        return {
            active: {type: GraphQLString},
            direction: {type: GraphQLString}
        }
    }
});
