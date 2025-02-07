import {GraphQLBoolean, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString} from "graphql";
import {taskCtr} from "../controllers/controllers/task";
import {sortType} from "./input-types/sortType";

const taskType = new GraphQLObjectType({
    name: 'Task',
    fields: () => {
        return {
            _id: {type: GraphQLString},
            description: {type: GraphQLString},
            status: {type: GraphQLString},
            createdAt: {type: GraphQLString}
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

const TaskSchema = {
    queries: {
        tasks: {
            type: new GraphQLList(taskType),
            args: {
                status: {type: GraphQLString},
                sort: {type: sortType}
            },
            resolve: async (root, {status, sort}) => {
                const tasks = await taskCtr.getTasks(status, sort);
                if (!tasks.success) {
                    throw new Error('Error');
                }
                return tasks.result;
            }
        }
    },
    mutations: {
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
        clearTaskCompleted: {
            type: taskResponseType,
            args: {},
            resolve: async (root, params) => {
                const task = await taskCtr.clearTaskCompleted();
                if (!task.success) {
                    throw new Error('Error');
                }
                return task;
            }
        },
    }
};

export default TaskSchema;

