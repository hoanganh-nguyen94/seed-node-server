import crudCtr from '../common/crud';

import TaskModule from '../models/task';

const taskCtr = {
    getTasks: async (status, {active, direction}) => {
        let filter = !!status ? {status} : {};
        let sort = {[`${active}`]: direction};
        return await crudCtr.findAll(TaskModule, filter, null, {sort});
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
    },
    clearTaskCompleted: async () => {
        return await crudCtr.deleteAll(TaskModule, {status: 'DONE'});
    }
};

export {taskCtr};
