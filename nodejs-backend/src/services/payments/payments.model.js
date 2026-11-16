
    module.exports = function (app) {
        const modelName = "payments";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            orderId: { type: Schema.Types.ObjectId, ref: "orders", comment: "Order, dropdown, false, true, true, true, true, true, true, orders, orders, one-to-one, orderNumber," },
transactionId: { type:  String , unique: true, index: true, trim: true, comment: "Transaction ID, inputText, false, true, true, true, true, true, true, , , , ," },
paymentMethod: { type:  String , required: true, index: true, trim: true, comment: "Payment Method, dropdown, false, true, true, true, true, true, true, , , , ," },
amount: { type: Number, required: true, comment: "Payment Amount, inputNumber, false, true, true, true, true, true, true, , , , ," },
status: { type:  String , required: true, index: true, trim: true, comment: "Payment Status, dropdown, false, true, true, true, true, true, true, , , , ," },
paidAt: { type: Date, comment: "Payment Date, p_calendar, false, true, true, true, true, true, true, , , , ," },
response: { type: Schema.Types.Mixed , comment: "Gateway Response, inputTextarea, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };