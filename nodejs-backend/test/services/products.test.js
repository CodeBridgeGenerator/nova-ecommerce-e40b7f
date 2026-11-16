const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("products service", async () => {
  let thisService;
  let productCreated;
  let usersServiceResults;
  let users;

  const categoriesCreated = await app.service("categories").Model.create({"name":"new value","slug":"new value","sku":"new value","description":"new value","categoryId":"parentObjectId","image":"new value","parentCategoryId":"parentObjectId","status":"new value","sortOrder":23});
const categoriesCreated = await app.service("categories").Model.create({"name":"new value","slug":"new value","sku":"new value","description":"new value","categoryId":"parentObjectId","image":"new value","parentCategoryId":`${categoriesCreated._id}`,"status":"new value","sortOrder":23});

  beforeEach(async () => {
    thisService = await app.service("products");

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
    assert.ok(thisService, "Registered the service (products)");
  });

  describe("#create", () => {
    const options = {"name":"new value","slug":"new value","sku":"new value","description":"new value","categoryId":`${categoriesCreated._id}`,"image":"new value","parentCategoryId":`${categoriesCreated._id}`,"status":"new value","sortOrder":23,"price":23,"discountPrice":23,"stockQuantity":23,"images":"new value","tags":"new value","isFeatured":true};

    beforeEach(async () => {
      productCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new product", () => {
      assert.strictEqual(productCreated.name, options.name);
assert.strictEqual(productCreated.slug, options.slug);
assert.strictEqual(productCreated.sku, options.sku);
assert.strictEqual(productCreated.description, options.description);
assert.strictEqual(productCreated.categoryId.toString(), options.categoryId.toString());
assert.strictEqual(productCreated.price, options.price);
assert.strictEqual(productCreated.discountPrice, options.discountPrice);
assert.strictEqual(productCreated.stockQuantity, options.stockQuantity);
assert.strictEqual(productCreated.images, options.images);
assert.strictEqual(productCreated.tags, options.tags);
assert.strictEqual(productCreated.status, options.status);
assert.strictEqual(productCreated.isFeatured, options.isFeatured);
assert.strictEqual(productCreated.isFeatured, options.isFeatured);
    });
  });

  describe("#get", () => {
    it("should retrieve a product by ID", async () => {
      const retrieved = await thisService.Model.findById(productCreated._id);
      assert.strictEqual(retrieved._id.toString(), productCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"name":"updated value","slug":"updated value","sku":"updated value","description":"updated value","categoryId":`${categoriesCreated._id}`,"price":100,"discountPrice":100,"stockQuantity":100,"images":"updated value","tags":"updated value","status":"updated value","isFeatured":false};

    it("should update an existing product ", async () => {
      const productUpdated = await thisService.Model.findByIdAndUpdate(
        productCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(productUpdated.name, options.name);
assert.strictEqual(productUpdated.slug, options.slug);
assert.strictEqual(productUpdated.sku, options.sku);
assert.strictEqual(productUpdated.description, options.description);
assert.strictEqual(productUpdated.categoryId.toString(), options.categoryId.toString());
assert.strictEqual(productUpdated.price, options.price);
assert.strictEqual(productUpdated.discountPrice, options.discountPrice);
assert.strictEqual(productUpdated.stockQuantity, options.stockQuantity);
assert.strictEqual(productUpdated.images, options.images);
assert.strictEqual(productUpdated.tags, options.tags);
assert.strictEqual(productUpdated.status, options.status);
assert.strictEqual(productUpdated.isFeatured, options.isFeatured);
assert.strictEqual(productUpdated.isFeatured, options.isFeatured);
    });
  });

  describe("#delete", async () => {
    it("should delete a product", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("categories").Model.findByIdAndDelete(categoriesCreated._id);;

      const productDeleted = await thisService.Model.findByIdAndDelete(productCreated._id);
      assert.strictEqual(productDeleted._id.toString(), productCreated._id.toString());
    });
  });
});