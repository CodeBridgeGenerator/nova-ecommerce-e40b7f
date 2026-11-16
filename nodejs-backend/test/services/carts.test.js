const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("carts service", async () => {
  let thisService;
  let cartCreated;
  let usersServiceResults;
  let users;

  

  beforeEach(async () => {
    thisService = await app.service("carts");

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
    assert.ok(thisService, "Registered the service (carts)");
  });

  describe("#create", () => {
    const options = {"userId":"parentObjectId","items":"new value","subtotal":23,"status":"new value"};

    beforeEach(async () => {
      cartCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new cart", () => {
      assert.strictEqual(cartCreated.userId.toString(), options.userId.toString());
assert.strictEqual(cartCreated.items, options.items);
assert.strictEqual(cartCreated.subtotal, options.subtotal);
assert.strictEqual(cartCreated.status, options.status);
    });
  });

  describe("#get", () => {
    it("should retrieve a cart by ID", async () => {
      const retrieved = await thisService.Model.findById(cartCreated._id);
      assert.strictEqual(retrieved._id.toString(), cartCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"userId":`${usersCreated._id}`,"items":"updated value","subtotal":100,"status":"updated value"};

    it("should update an existing cart ", async () => {
      const cartUpdated = await thisService.Model.findByIdAndUpdate(
        cartCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(cartUpdated.userId.toString(), options.userId.toString());
assert.strictEqual(cartUpdated.items, options.items);
assert.strictEqual(cartUpdated.subtotal, options.subtotal);
assert.strictEqual(cartUpdated.status, options.status);
    });
  });

  describe("#delete", async () => {
    it("should delete a cart", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      ;

      const cartDeleted = await thisService.Model.findByIdAndDelete(cartCreated._id);
      assert.strictEqual(cartDeleted._id.toString(), cartCreated._id.toString());
    });
  });
});