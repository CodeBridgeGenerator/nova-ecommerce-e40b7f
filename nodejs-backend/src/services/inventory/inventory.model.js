
    module.exports = function (app) {
        const modelName = "inventory";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            productId: { type: Schema.Types.ObjectId, ref: "products", comment: "Product, dropdown, false, true, true, true, true, true, true, products, products, one-to-one, name," },
quantity: { type: Number, required: true, comment: "Available Quantity, inputNumber, false, true, true, true, true, true, true, , , , ," },
reorderLevel: { type: Number, required: true, comment: "Reorder Level, inputNumber, false, true, true, true, true, true, true, , , , ," },
lastRestockedAt: { type: Date, comment: "Last Restocked Date, p_calendar, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };