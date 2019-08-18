import {GraphQLBoolean, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString} from "graphql";
import {taskCtr} from "../mongodb/controllers/task";

const taskType = new GraphQLObjectType({
    name: 'Task',
    fields: () => {
        return {
            _id: {type: GraphQLString},
            description: {type: GraphQLString},
            status: {type: GraphQLString},
        }
    }
});

const taskResponseType = new GraphQLObjectType({
    name: 'TaskResponse',
    fields: () => {
        return {
            success: {type: GraphQLBoolean},
            result: {type: taskType}
        }
    }
});

const query = new GraphQLObjectType({
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
            createTask: {
                type: taskResponseType,
                args: {
                    description: {type: new GraphQLNonNull(GraphQLString)},
                },
                resolve: async (root, params) => {
                    const taskModel = {...params};
                    const task = await taskCtr.createTask(taskModel);
                    if (!task.success) {
                        throw new Error('Error');
                    }
                    return task;
                }
            },
            updateTask: {
                type: taskResponseType,
                args: {
                    id: {type: new GraphQLNonNull(GraphQLString)},
                },
                resolve: async (root, params) => {
                    const taskModel = {...params, status: 'DONE'};
                    const task = await taskCtr.updateTask(taskModel);
                    if (!task.success) {
                        throw new Error('Error');
                    }
                    return task;
                }
            },
            deleteTask: {
                type: taskResponseType,
                args: {
                    id: {type: new GraphQLNonNull(GraphQLString)},
                },
                resolve: async (root, params) => {
                    const taskModel = {...params};
                    const task = await taskCtr.deleteTask(taskModel);
                    if (!task.success) {
                        throw new Error('Error');
                    }
                    return task;
                }
            },
        }
    }
});
const TaskSchema = new GraphQLSchema({query: query, mutation: mutation});
module.exports = TaskSchema;

