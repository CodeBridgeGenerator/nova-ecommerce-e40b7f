
    module.exports = function (app) {
        const modelName = "orders";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            orderNumber: { type:  String , required: true, unique: true, index: true, trim: true, comment: "Order Number, inputText, false, true, true, true, true, true, true, , , , ," },
userId: { type: Schema.Types.ObjectId, ref: "users", comment: "Customer, dropdown, false, true, true, true, true, true, true, users, users, one-to-one, email," },
items: { type:  String , required: true, comment: "Ordered Products, inputTextarea, false, true, true, true, true, true, true, , , , ," },
shippingAddressId: { type: Schema.Types.ObjectId, ref: "userAddresses", comment: "Shipping Address, dropdown, false, true, true, true, true, true, true, userAddresses, userAddresses, one-to-one, address," },
subtotal: { type: Number, required: true, comment: "Subtotal, inputNumber, false, true, true, true, true, true, true, , , , ," },
shippingFee: { type: Number, required: true, comment: "Shipping Fee, inputNumber, false, true, true, true, true, true, true, , , , ," },
discount: { type: Number, comment: "Discount, inputNumber, false, true, true, true, true, true, true, , , , ," },
total: { type: Number, required: true, comment: "Order Total, inputNumber, false, true, true, true, true, true, true, , , , ," },
paymentStatus: { type:  String , required: true, index: true, trim: true, comment: "Payment Status, dropdown, false, true, true, true, true, true, true, , , , ," },
orderStatus: { type:  String , required: true, index: true, trim: true, comment: "Order Status, dropdown, false, true, true, true, true, true, true, , , , ," },
orderedAt: { type: Date, required: true, comment: "Order Date, p_calendar, false, true, true, true, true, true, true, , , , ," },
notes: { type:  String , trim: true, comment: "Order Notes, inputTextarea, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };