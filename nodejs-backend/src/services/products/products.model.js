
    module.exports = function (app) {
        const modelName = "products";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            name: { type:  String , required: true, index: true, trim: true, comment: "Product Name, inputText, false, true, true, true, true, true, true, , , , ," },
slug: { type:  String , required: true, unique: true, index: true, trim: true, comment: "Product Slug, inputText, false, true, true, true, true, true, true, , , , ," },
sku: { type:  String , required: true, unique: true, index: true, trim: true, comment: "SKU, inputText, false, true, true, true, true, true, true, , , , ," },
description: { type:  String , required: true, trim: true, comment: "Description, inputTextarea, false, true, true, true, true, true, true, , , , ," },
categoryId: { type: Schema.Types.ObjectId, ref: "categories", comment: "Category, dropdown, false, true, true, true, true, true, true, categories, categories, one-to-one, name," },
price: { type: Number, required: true, comment: "Price, inputNumber, false, true, true, true, true, true, true, , , , ," },
discountPrice: { type: Number, comment: "Discount Price, inputNumber, false, true, true, true, true, true, true, , , , ," },
stockQuantity: { type: Number, required: true, comment: "Stock Quantity, inputNumber, false, true, true, true, true, true, true, , , , ," },
images: { type: [String] , description: "isArray", comment: "Product Images, chip, false, true, true, true, true, true, true, , , , ," },
tags: { type: [String] , trim: true, description: "isArray", comment: "Tags, chip, false, true, true, true, true, true, true, , , , ," },
status: { type:  String , required: true, index: true, trim: true, comment: "Status, dropdown, false, true, true, true, true, true, true, , , , ," },
isFeatured: { type: Boolean, required: false, comment: "Featured Product, p_boolean, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };