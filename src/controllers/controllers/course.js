import crudCtr from '../common/crud';

import CourseModule from '../../mongodb/models/course';

const courseCtr = {
    getCourses: async () => {
        let filter = {};
        let sort = {};
        return await crudCtr.findAll(CourseModule, filter, null, {sort});
    },
    createCourse: async ({description, longDescription, iconUrl, category, lessonsCount, seqNo, url}) => {
        const course = {description, longDescription, iconUrl, category, lessonsCount, seqNo, url};
        return await crudCtr.create(CourseModule, course);
    },
    updateCourse: async ({id, ...updateData}) => {
        return await crudCtr.update(CourseModule, {_id: id}, updateData, {
            new: true
        });
    },
    deleteCourse: async ({id}) => {
        return await crudCtr.delete(CourseModule, {_id: id});
    },
};

export {courseCtr};
