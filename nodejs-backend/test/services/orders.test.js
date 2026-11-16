const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("orders service", async () => {
  let thisService;
  let orderCreated;
  let usersServiceResults;
  let users;

  

  beforeEach(async () => {
    thisService = await app.service("orders");

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
    assert.ok(thisService, "Registered the service (orders)");
  });

  describe("#create", () => {
    const options = {"orderNumber":"new value","userId":"parentObjectId","items":"new value","shippingAddressId":"parentObjectId","subtotal":23,"shippingFee":23,"discount":23,"total":23,"paymentStatus":"new value","orderStatus":"new value","orderedAt":"2026-11-16T18:46:38.132Z","notes":"new value"};

    beforeEach(async () => {
      orderCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new order", () => {
      assert.strictEqual(orderCreated.orderNumber, options.orderNumber);
assert.strictEqual(orderCreated.userId.toString(), options.userId.toString());
assert.strictEqual(orderCreated.items, options.items);
assert.strictEqual(orderCreated.shippingAddressId.toString(), options.shippingAddressId.toString());
assert.strictEqual(orderCreated.subtotal, options.subtotal);
assert.strictEqual(orderCreated.shippingFee, options.shippingFee);
assert.strictEqual(orderCreated.discount, options.discount);
assert.strictEqual(orderCreated.total, options.total);
assert.strictEqual(orderCreated.paymentStatus, options.paymentStatus);
assert.strictEqual(orderCreated.orderStatus, options.orderStatus);
assert.strictEqual(orderCreated.orderedAt.toISOString(), options.orderedAt);
assert.strictEqual(orderCreated.notes, options.notes);
    });
  });

  describe("#get", () => {
    it("should retrieve a order by ID", async () => {
      const retrieved = await thisService.Model.findById(orderCreated._id);
      assert.strictEqual(retrieved._id.toString(), orderCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"orderNumber":"updated value","userId":`${usersCreated._id}`,"items":"updated value","shippingAddressId":`${userAddressesCreated._id}`,"subtotal":100,"shippingFee":100,"discount":100,"total":100,"paymentStatus":"updated value","orderStatus":"updated value","orderedAt":"2026-11-16T18:46:38.132Z","notes":"updated value"};

    it("should update an existing order ", async () => {
      const orderUpdated = await thisService.Model.findByIdAndUpdate(
        orderCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(orderUpdated.orderNumber, options.orderNumber);
assert.strictEqual(orderUpdated.userId.toString(), options.userId.toString());
assert.strictEqual(orderUpdated.items, options.items);
assert.strictEqual(orderUpdated.shippingAddressId.toString(), options.shippingAddressId.toString());
assert.strictEqual(orderUpdated.subtotal, options.subtotal);
assert.strictEqual(orderUpdated.shippingFee, options.shippingFee);
assert.strictEqual(orderUpdated.discount, options.discount);
assert.strictEqual(orderUpdated.total, options.total);
assert.strictEqual(orderUpdated.paymentStatus, options.paymentStatus);
assert.strictEqual(orderUpdated.orderStatus, options.orderStatus);
assert.strictEqual(orderUpdated.orderedAt.toISOString(), options.orderedAt);
assert.strictEqual(orderUpdated.notes, options.notes);
    });
  });

  describe("#delete", async () => {
    it("should delete a order", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      ;

      const orderDeleted = await thisService.Model.findByIdAndDelete(orderCreated._id);
      assert.strictEqual(orderDeleted._id.toString(), orderCreated._id.toString());
    });
  });
});