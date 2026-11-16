
    module.exports = function (app) {
        const modelName = "coupons";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            code: { type:  String , required: true, unique: true, index: true, trim: true, comment: "Coupon Code, inputText, false, true, true, true, true, true, true, , , , ," },
description: { type:  String , trim: true, comment: "Description, inputTextarea, false, true, true, true, true, true, true, , , , ," },
discountType: { type:  String , required: true, trim: true, comment: "Discount Type, dropdown, false, true, true, true, true, true, true, , , , ," },
discountValue: { type: Number, required: true, comment: "Discount Value, inputNumber, false, true, true, true, true, true, true, , , , ," },
minimumOrderAmount: { type: Number, comment: "Minimum Order Amount, inputNumber, false, true, true, true, true, true, true, , , , ," },
usageLimit: { type: Number, comment: "Usage Limit, inputNumber, false, true, true, true, true, true, true, , , , ," },
usedCount: { type: Number, comment: "Used Count, inputNumber, false, true, true, true, true, true, true, , , , ," },
startsAt: { type: Date, required: true, comment: "Start Date, p_calendar, false, true, true, true, true, true, true, , , , ," },
expiresAt: { type: Date, required: true, comment: "Expiry Date, p_calendar, false, true, true, true, true, true, true, , , , ," },
status: { type:  String , required: true, index: true, trim: true, comment: "Status, dropdown, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };