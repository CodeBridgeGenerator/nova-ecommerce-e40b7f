
    module.exports = function (app) {
        const modelName = "categories";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            name: { type:  String , required: true, unique: true, index: true, trim: true, comment: "Category Name, inputText, false, true, true, true, true, true, true, , , , ," },
description: { type:  String , trim: true, comment: "Description, inputTextarea, false, true, true, true, true, true, true, , , , ," },
image: { type:  String , trim: true, comment: "Category Image, inputText, false, true, true, true, true, true, true, , , , ," },
parentCategoryId: { type: Schema.Types.ObjectId, ref: "categories", comment: "Parent Category, dropdown, false, true, true, true, true, true, true, categories, categories, one-to-one, name," },
status: { type:  String , required: true, index: true, trim: true, comment: "Status, dropdown, false, true, true, true, true, true, true, , , , ," },
sortOrder: { type: Number, comment: "Sort Order, inputNumber, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };