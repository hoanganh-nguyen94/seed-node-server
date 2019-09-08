import crudCtr from '../common/crud';

import LessonModule from '../../mongodb/models/lesson';

const lessonCtr = {
    getLessons: async (status, {active, direction}) => {
        let filter = !!status ? {status} : {};
        let sort = {[`${active}`]: direction};
        return await crudCtr.findAll(LessonModule, filter, null, {sort});
    },
    createLesson: async ({description, longDescription, iconUrl, category, lessonsCount, seqNo, url}) => {
        const lesson = {description, longDescription, iconUrl, category, lessonsCount, seqNo, url};
        return await crudCtr.create(LessonModule, lesson);
    },
    updateLesson: async ({id, ...updateData}) => {
        return await crudCtr.update(LessonModule, {_id: id}, updateData, {
            new: true
        });
    },
    deleteLesson: async ({id}) => {
        return await crudCtr.delete(LessonModule, {_id: id});
    },
};

export {lessonCtr};
