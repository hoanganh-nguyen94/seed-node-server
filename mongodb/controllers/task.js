import crudCtr from '../common/crud';

import TaskModule from '../models/task';

const taskCtr = {
    getTasks: async () => {
        return await crudCtr.findAll(TaskModule);
    },
    createTask: async ({description}) => {
        const task = {description, status: 'IN_PROGRESS'};
        return await crudCtr.create(TaskModule, task);
    },
    updateTask: async ({id, ...updateData}) => {
        return await crudCtr.update(TaskModule, {_id: id}, updateData, {
            new: true
        });
    },
    deleteTask: async ({id}) => {
        return await crudCtr.delete(TaskModule, {_id: id});
    }
};

export {taskCtr};
