
    module.exports = function (app) {
        const modelName = "wishlists";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            userId: { type: Schema.Types.ObjectId, ref: "users", comment: "Customer, dropdown, false, true, true, true, true, true, true, users, users, one-to-one, email," },
productIds: { type: [Schema.Types.ObjectId], ref: "products", description: "isArray", comment: "Wishlist Products, multiselect, false, true, true, true, true, true, true, products, products, one-to-many, name," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };