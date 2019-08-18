import {GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString} from "graphql";
import {taskCtr} from "../mongodb/controllers/task";

let taskType = new GraphQLObjectType({
    name: 'task',
    fields: () => {
        return {
            _id: {type: GraphQLString},
            description: {type: GraphQLString},
            status: {type: GraphQLString},
        }
    }
});

// let taskResponseType = new GraphQLObjectType({
//     name: 'taskResponse',
//     fields: () => {
//         return {
//             success: {type: GraphQLBoolean},
//             result: {
//                 _id: {type: GraphQLString},
//                 description: {type: GraphQLString},
//                 status: {type: GraphQLString},
//             }
//         }
//     }
// });

let queryType = new GraphQLObjectType({
    name: 'Query',
    fields: () => {
        return {
            tasks: {
                type: new GraphQLList(taskType),
                resolve: async () => {
                    const tasks = await taskCtr.getTasks();
                    if (!tasks.success) {
                        throw new Error('Error');
                    }
                    return tasks.result;
                }
            }
        }
    }
});

let mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => {
        return {
            addTask: {
                type: taskType,
                args: {
                    description: {type: new GraphQLNonNull(GraphQLString)},
                },
                resolve: async (root, params) => {
                    const taskModel = {...params};
                    const task = await taskCtr.createTask(taskModel);
                    if (!task.success) {
                        throw new Error('Error');
                    }
                    return task.result;
                }
            },
            updateTask: {
                type: taskType,
                args: {
                    id: {type: new GraphQLNonNull(GraphQLString)},
                },
                resolve: async (root, params) => {
                    const taskModel = {...params, status: 'DONE'};
                    const task = await taskCtr.updateTask(taskModel);
                    if (!task.success) {
                        throw new Error('Error');
                    }
                    return task.result;
                }
            },
            deleteTask: {
                type: taskType,
                args: {
                    id: {type: new GraphQLNonNull(GraphQLString)},
                },
                resolve: async (root, params) => {
                    const taskModel = {...params};
                    const task = await taskCtr.deleteTask(taskModel);
                    if (!task.success) {
                        throw new Error('Error');
                    }
                    return task.result;
                }
            },

        }
    }
});

module.exports = new GraphQLSchema({query: queryType, mutation: mutation});
