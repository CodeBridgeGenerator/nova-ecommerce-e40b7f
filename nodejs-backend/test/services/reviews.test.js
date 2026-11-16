const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("reviews service", async () => {
  let thisService;
  let reviewCreated;
  let usersServiceResults;
  let users;

  const categoriesCreated = await app.service("categories").Model.create({"productId":"parentObjectId","name":"new value","slug":"new value","sku":"new value","description":"new value","categoryId":"parentObjectId","image":"new value","parentCategoryId":"parentObjectId","status":"new value","sortOrder":23});
const categoriesCreated = await app.service("categories").Model.create({"productId":"parentObjectId","name":"new value","slug":"new value","sku":"new value","description":"new value","categoryId":"parentObjectId","image":"new value","parentCategoryId":`${categoriesCreated._id}`,"status":"new value","sortOrder":23});
const productsCreated = await app.service("products").Model.create({"productId":"parentObjectId","name":"new value","slug":"new value","sku":"new value","description":"new value","categoryId":`${categoriesCreated._id}`,"image":"new value","parentCategoryId":`${categoriesCreated._id}`,"status":"new value","sortOrder":23,"price":23,"discountPrice":23,"stockQuantity":23,"images":"new value","tags":"new value","isFeatured":true});

  beforeEach(async () => {
    thisService = await app.service("reviews");

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
    assert.ok(thisService, "Registered the service (reviews)");
  });

  describe("#create", () => {
    const options = {"productId":`${productsCreated._id}`,"name":"new value","slug":"new value","sku":"new value","description":"new value","categoryId":`${categoriesCreated._id}`,"image":"new value","parentCategoryId":`${categoriesCreated._id}`,"status":"new value","sortOrder":23,"price":23,"discountPrice":23,"stockQuantity":23,"images":"new value","tags":"new value","isFeatured":true,"userId":"parentObjectId","rating":23,"comment":"new value"};

    beforeEach(async () => {
      reviewCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new review", () => {
      assert.strictEqual(reviewCreated.productId.toString(), options.productId.toString());
assert.strictEqual(reviewCreated.userId.toString(), options.userId.toString());
assert.strictEqual(reviewCreated.rating, options.rating);
assert.strictEqual(reviewCreated.comment, options.comment);
assert.strictEqual(reviewCreated.status, options.status);
    });
  });

  describe("#get", () => {
    it("should retrieve a review by ID", async () => {
      const retrieved = await thisService.Model.findById(reviewCreated._id);
      assert.strictEqual(retrieved._id.toString(), reviewCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"productId":`${productsCreated._id}`,"userId":`${usersCreated._id}`,"rating":100,"comment":"updated value","status":"updated value"};

    it("should update an existing review ", async () => {
      const reviewUpdated = await thisService.Model.findByIdAndUpdate(
        reviewCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(reviewUpdated.productId.toString(), options.productId.toString());
assert.strictEqual(reviewUpdated.userId.toString(), options.userId.toString());
assert.strictEqual(reviewUpdated.rating, options.rating);
assert.strictEqual(reviewUpdated.comment, options.comment);
assert.strictEqual(reviewUpdated.status, options.status);
    });
  });

  describe("#delete", async () => {
    it("should delete a review", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("categories").Model.findByIdAndDelete(categoriesCreated._id);
await app.service("products").Model.findByIdAndDelete(productsCreated._id);;

      const reviewDeleted = await thisService.Model.findByIdAndDelete(reviewCreated._id);
      assert.strictEqual(reviewDeleted._id.toString(), reviewCreated._id.toString());
    });
  });
});