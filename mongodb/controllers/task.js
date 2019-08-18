import crudCtr from '../common/crud';

const taskModule = require('../models/task');


const taskCtr = {
    getTasks: async () => {
        return await crudCtr.findAll(taskModule);
    },
    createTask: async ({description}) => {
        const task = {description, status: 'IN_PROGRESS'};
        return await crudCtr.create(taskModule, task);
    },
    // updateTask: async ({id, ...updateData}) => {
    //     return crudCtr.update(task, {id}, updateData, {
    //         new: true
    //     });
    // },
    // deleteTask: async ({id}) => {
    //     return crudCtr.delete(task, {id});
    // }
};

export {taskCtr};
