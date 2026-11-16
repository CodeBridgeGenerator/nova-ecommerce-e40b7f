const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("payments service", async () => {
  let thisService;
  let paymentCreated;
  let usersServiceResults;
  let users;

  const ordersCreated = await app.service("orders").Model.create({"orderId":"parentObjectId","orderNumber":"new value","userId":"parentObjectId","items":"new value","shippingAddressId":"parentObjectId","subtotal":23,"shippingFee":23,"discount":23,"total":23,"paymentStatus":"new value","orderStatus":"new value","orderedAt":"2026-11-16T18:46:38.158Z","notes":"new value"});

  beforeEach(async () => {
    thisService = await app.service("payments");

    // Create users here
    usersServiceResults = await app.service("users").Model.create(usersRefData);
    users = {
      createdBy: usersServiceResults[0]._id,
      updatedBy: usersServiceResults[0]._id,
    };
  });

  after(async () => {
    if (usersServiceResults) {
      await Promise.all(
        usersServiceResults.map((i) =>
          app.service("users").Model.findByIdAndDelete(i._id)
        )
      );
    }
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (payments)");
  });

  describe("#create", () => {
    const options = {"orderId":`${ordersCreated._id}`,"orderNumber":"new value","userId":"parentObjectId","items":"new value","shippingAddressId":"parentObjectId","subtotal":23,"shippingFee":23,"discount":23,"total":23,"paymentStatus":"new value","orderStatus":"new value","orderedAt":"2026-11-16T18:46:38.158Z","notes":"new value","transactionId":"new value","paymentMethod":"new value","amount":23,"status":"new value","paidAt":"2026-11-16T18:46:38.158Z","response":{"name":"John Doe Many","age":20,"dateofbirth":"1999-01-01T00:00:00.000Z"}};

    beforeEach(async () => {
      paymentCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new payment", () => {
      assert.strictEqual(paymentCreated.orderId.toString(), options.orderId.toString());
assert.strictEqual(paymentCreated.transactionId, options.transactionId);
assert.strictEqual(paymentCreated.paymentMethod, options.paymentMethod);
assert.strictEqual(paymentCreated.amount, options.amount);
assert.strictEqual(paymentCreated.status, options.status);
assert.strictEqual(paymentCreated.paidAt.toISOString(), options.paidAt);
assert.strictEqual(paymentCreated.response, options.response);
    });
  });

  describe("#get", () => {
    it("should retrieve a payment by ID", async () => {
      const retrieved = await thisService.Model.findById(paymentCreated._id);
      assert.strictEqual(retrieved._id.toString(), paymentCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"orderId":`${ordersCreated._id}`,"transactionId":"updated value","paymentMethod":"updated value","amount":100,"status":"updated value","paidAt":"2026-11-16T18:46:38.158Z","response":{"name":"John Doe","age":200,"dateofbirth":"2025-01-31T00:00:00.000Z"}};

    it("should update an existing payment ", async () => {
      const paymentUpdated = await thisService.Model.findByIdAndUpdate(
        paymentCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(paymentUpdated.orderId.toString(), options.orderId.toString());
assert.strictEqual(paymentUpdated.transactionId, options.transactionId);
assert.strictEqual(paymentUpdated.paymentMethod, options.paymentMethod);
assert.strictEqual(paymentUpdated.amount, options.amount);
assert.strictEqual(paymentUpdated.status, options.status);
assert.strictEqual(paymentUpdated.paidAt.toISOString(), options.paidAt);
assert.strictEqual(paymentUpdated.response, options.response);
    });
  });

  describe("#delete", async () => {
    it("should delete a payment", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("orders").Model.findByIdAndDelete(ordersCreated._id);;

      const paymentDeleted = await thisService.Model.findByIdAndDelete(paymentCreated._id);
      assert.strictEqual(paymentDeleted._id.toString(), paymentCreated._id.toString());
    });
  });
});