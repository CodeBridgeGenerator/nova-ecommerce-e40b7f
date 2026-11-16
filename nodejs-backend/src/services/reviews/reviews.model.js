
    module.exports = function (app) {
        const modelName = "reviews";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            productId: { type: Schema.Types.ObjectId, ref: "products", comment: "Product, dropdown, false, true, true, true, true, true, true, products, products, one-to-one, name," },
userId: { type: Schema.Types.ObjectId, ref: "users", comment: "Customer, dropdown, false, true, true, true, true, true, true, users, users, one-to-one, email," },
rating: { type: Number, required: true, comment: "Rating, inputNumber, false, true, true, true, true, true, true, , , , ," },
comment: { type:  String , trim: true, comment: "Review, inputTextarea, false, true, true, true, true, true, true, , , , ," },
status: { type:  String , required: true, index: true, trim: true, comment: "Review Status, dropdown, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };