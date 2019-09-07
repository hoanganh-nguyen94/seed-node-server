import {GraphQLList, GraphQLObjectType, GraphQLString} from "graphql";
import {issueCtr} from "../mongodb/controllers/issue";
import {sortType} from "./input-types/sortType";

const issueType = new GraphQLObjectType({
    name: 'Issue',
    fields: () => {
        return {
            _id: {type: GraphQLString},
            description: {type: GraphQLString},
            status: {type: GraphQLString},
            createdAt: {type: GraphQLString}
        }
    }
});

const IssueSchema = {
    queries :{
        issues: {
            type: new GraphQLList(issueType),
            args: {
                status: {type: GraphQLString},
                sort: {type: sortType}
            },
            resolve: async (root, {status, sort}) => {
                const issues = await issueCtr.getIssues(status, sort);
                if (!issues.success) {
                    throw new Error('Error');
                }
                return issues.result;
            }
        }
    },

};

export default IssueSchema;

