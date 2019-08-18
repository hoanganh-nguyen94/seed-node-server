const crudCtr = {
    findAll: async (model, conditions = {}, projection = '', options = {}) => {
        const foundResults = await model.find(conditions, projection, options);

        return {
            ...(!foundResults
                ? {
                    success: false,
                    message: `Get ${crudCtr.getModelName(model)} failed!`
                }
                : {success: true, result: foundResults})
        };
    },
    findOne: async (model, conditions = {}, projection = '', options = {}) => {
        const foundResults = await model.findOne(
            conditions,
            projection,
            options
        );

        return {
            ...(!foundResults
                ? {
                    success: false,
                    message: `Get ${crudCtr.getModelName(model)} failed!`
                }
                : {success: true, result: foundResults})
        };
    },
    create: async (model, args) => {
        const createdRecord = await model.create(args);

        return {
            ...(!createdRecord
                ? {success: false, message: `Create ${crudCtr.getModelName(model)} failed!`}
                : {success: true, result: createdRecord})
        };
    },
    update: async (model, conditions = {}, update = {}, options = {}) => {
        const updatedRecord = await model.findOneAndUpdate(
            conditions,
            update,
            options
        );
        return {
            ...(!updatedRecord
                ? {
                    success: false,
                    message: `Update ${crudCtr.getModelName(model)} failed!`
                }
                : {success: true, result: updatedRecord})
        };
    },
    delete: async (model, conditions = {}, options = {}) => {
        const deletedRecord = await model.findOneAndDelete(conditions, options);
        return {
            ...(!deletedRecord
                ? {
                    success: false,
                    message: `Delete ${crudCtr.getModelName(model)} failed!`
                }
                : {success: true, result: deletedRecord})
        };
    },
    getModelName: model => {
        return model.collection.collectionName;
    }
};

export default crudCtr;
