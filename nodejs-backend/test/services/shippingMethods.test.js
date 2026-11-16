const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("shippingMethods service", async () => {
  let thisService;
  let shippingMethodCreated;
  let usersServiceResults;
  let users;

  

  beforeEach(async () => {
    thisService = await app.service("shippingMethods");

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
    assert.ok(thisService, "Registered the service (shippingMethods)");
  });

  describe("#create", () => {
    const options = {"name":"new value","description":"new value","fee":23,"estimatedDeliveryDays":23,"status":"new value"};

    beforeEach(async () => {
      shippingMethodCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new shippingMethod", () => {
      assert.strictEqual(shippingMethodCreated.name, options.name);
assert.strictEqual(shippingMethodCreated.description, options.description);
assert.strictEqual(shippingMethodCreated.fee, options.fee);
assert.strictEqual(shippingMethodCreated.estimatedDeliveryDays, options.estimatedDeliveryDays);
assert.strictEqual(shippingMethodCreated.status, options.status);
    });
  });

  describe("#get", () => {
    it("should retrieve a shippingMethod by ID", async () => {
      const retrieved = await thisService.Model.findById(shippingMethodCreated._id);
      assert.strictEqual(retrieved._id.toString(), shippingMethodCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"name":"updated value","description":"updated value","fee":100,"estimatedDeliveryDays":100,"status":"updated value"};

    it("should update an existing shippingMethod ", async () => {
      const shippingMethodUpdated = await thisService.Model.findByIdAndUpdate(
        shippingMethodCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(shippingMethodUpdated.name, options.name);
assert.strictEqual(shippingMethodUpdated.description, options.description);
assert.strictEqual(shippingMethodUpdated.fee, options.fee);
assert.strictEqual(shippingMethodUpdated.estimatedDeliveryDays, options.estimatedDeliveryDays);
assert.strictEqual(shippingMethodUpdated.status, options.status);
    });
  });

  describe("#delete", async () => {
    it("should delete a shippingMethod", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      ;

      const shippingMethodDeleted = await thisService.Model.findByIdAndDelete(shippingMethodCreated._id);
      assert.strictEqual(shippingMethodDeleted._id.toString(), shippingMethodCreated._id.toString());
    });
  });
});