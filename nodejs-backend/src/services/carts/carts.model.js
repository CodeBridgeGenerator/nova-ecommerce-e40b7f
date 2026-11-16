
    module.exports = function (app) {
        const modelName = "carts";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            userId: { type: Schema.Types.ObjectId, ref: "users", comment: "Customer, dropdown, false, true, true, true, true, true, true, users, users, one-to-one, email," },
items: { type:  String , required: true, comment: "Cart Items, inputTextarea, false, true, true, true, true, true, true, , , , ," },
subtotal: { type: Number, required: true, comment: "Subtotal, inputNumber, false, true, true, true, true, true, true, , , , ," },
status: { type:  String , required: true, index: true, trim: true, comment: "Cart Status, dropdown, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };