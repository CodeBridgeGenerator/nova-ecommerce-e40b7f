const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("inventory service", async () => {
  let thisService;
  let inventoryCreated;
  let usersServiceResults;
  let users;

  const categoriesCreated = await app.service("categories").Model.create({"productId":"parentObjectId","name":"new value","slug":"new value","sku":"new value","description":"new value","categoryId":"parentObjectId","image":"new value","parentCategoryId":"parentObjectId","status":"new value","sortOrder":23});
const categoriesCreated = await app.service("categories").Model.create({"productId":"parentObjectId","name":"new value","slug":"new value","sku":"new value","description":"new value","categoryId":"parentObjectId","image":"new value","parentCategoryId":`${categoriesCreated._id}`,"status":"new value","sortOrder":23});
const productsCreated = await app.service("products").Model.create({"productId":"parentObjectId","name":"new value","slug":"new value","sku":"new value","description":"new value","categoryId":`${categoriesCreated._id}`,"image":"new value","parentCategoryId":`${categoriesCreated._id}`,"status":"new value","sortOrder":23,"price":23,"discountPrice":23,"stockQuantity":23,"images":"new value","tags":"new value","isFeatured":true});

  beforeEach(async () => {
    thisService = await app.service("inventory");

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
    assert.ok(thisService, "Registered the service (inventory)");
  });

  describe("#create", () => {
    const options = {"productId":`${productsCreated._id}`,"name":"new value","slug":"new value","sku":"new value","description":"new value","categoryId":`${categoriesCreated._id}`,"image":"new value","parentCategoryId":`${categoriesCreated._id}`,"status":"new value","sortOrder":23,"price":23,"discountPrice":23,"stockQuantity":23,"images":"new value","tags":"new value","isFeatured":true,"quantity":23,"reorderLevel":23,"lastRestockedAt":"2026-11-16T18:46:38.179Z"};

    beforeEach(async () => {
      inventoryCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new inventory", () => {
      assert.strictEqual(inventoryCreated.productId.toString(), options.productId.toString());
assert.strictEqual(inventoryCreated.quantity, options.quantity);
assert.strictEqual(inventoryCreated.reorderLevel, options.reorderLevel);
assert.strictEqual(inventoryCreated.lastRestockedAt.toISOString(), options.lastRestockedAt);
    });
  });

  describe("#get", () => {
    it("should retrieve a inventory by ID", async () => {
      const retrieved = await thisService.Model.findById(inventoryCreated._id);
      assert.strictEqual(retrieved._id.toString(), inventoryCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"productId":`${productsCreated._id}`,"quantity":100,"reorderLevel":100,"lastRestockedAt":"2026-11-16T18:46:38.179Z"};

    it("should update an existing inventory ", async () => {
      const inventoryUpdated = await thisService.Model.findByIdAndUpdate(
        inventoryCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(inventoryUpdated.productId.toString(), options.productId.toString());
assert.strictEqual(inventoryUpdated.quantity, options.quantity);
assert.strictEqual(inventoryUpdated.reorderLevel, options.reorderLevel);
assert.strictEqual(inventoryUpdated.lastRestockedAt.toISOString(), options.lastRestockedAt);
    });
  });

  describe("#delete", async () => {
    it("should delete a inventory", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("categories").Model.findByIdAndDelete(categoriesCreated._id);
await app.service("products").Model.findByIdAndDelete(productsCreated._id);;

      const inventoryDeleted = await thisService.Model.findByIdAndDelete(inventoryCreated._id);
      assert.strictEqual(inventoryDeleted._id.toString(), inventoryCreated._id.toString());
    });
  });
});