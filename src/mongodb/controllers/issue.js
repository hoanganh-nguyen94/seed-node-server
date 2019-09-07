import crudCtr from '../common/crud';

import IssueModule from '../models/issue';

const issueCtr = {
    getIssues: async (status, {active, direction}) => {
        let filter = !!status ? {status} : {};
        let sort = {[`${active}`]: direction};
        return await crudCtr.findAll(IssueModule, filter, null, {sort});
    },
    createIssue: async ({description}) => {
        const issue = {description, status: 'IN_PROGRESS'};
        return await crudCtr.create(IssueModule, issue);
    },
    updateIssue: async ({id, ...updateData}) => {
        return await crudCtr.update(IssueModule, {_id: id}, updateData, {
            new: true
        });
    },
    deleteIssue: async ({id}) => {
        return await crudCtr.delete(IssueModule, {_id: id});
    },
    clearIssueCompleted: async () => {
        return await crudCtr.deleteAll(IssueModule, {status: 'DONE'});
    }
};

export {issueCtr};
