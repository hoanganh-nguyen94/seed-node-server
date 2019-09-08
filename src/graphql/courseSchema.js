import {GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString} from "graphql";
import {courseCtr} from "../mongodb/controllers/course";
import {sortType} from "./input-types/sortType";


const courseType = new GraphQLObjectType({
    name: 'Course',
    fields: () => {
        return {
            _id: {type: GraphQLString},
            description: {type: GraphQLString},
            longDescription: {type: GraphQLString},
            iconUrl: {type: GraphQLString},
            category: {type: GraphQLString},
            lessonsCount: {type: GraphQLInt},
            seqNo: {type: GraphQLInt},
            url: {type: GraphQLString},

        }
    }
});

const CourseSchema = {
    queries: {
        courses: {
            type: new GraphQLList(courseType),
            args: {
                status: {type: GraphQLString},
                sort: {type: sortType}
            },
            resolve: async (root, {status, sort}) => {
                const courses = await courseCtr.getCourses(status, sort);
                if (!courses.success) {
                    throw new Error('Error');
                }
                return courses.result;
            }
        }
    },

};

export default CourseSchema;

