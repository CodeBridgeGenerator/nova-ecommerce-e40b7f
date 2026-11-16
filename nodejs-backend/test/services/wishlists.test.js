const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("wishlists service", async () => {
  let thisService;
  let wishlistCreated;
  let usersServiceResults;
  let users;

  const categoriesCreated = await app.service("categories").Model.create({"userId":"parentObjectId","productIds":"parentObjectId","name":"new value","slug":"new value","sku":"new value","description":"new value","categoryId":"parentObjectId","image":"new value","parentCategoryId":"parentObjectId","status":"new value","sortOrder":23});
const categoriesCreated = await app.service("categories").Model.create({"userId":"parentObjectId","productIds":"parentObjectId","name":"new value","slug":"new value","sku":"new value","description":"new value","categoryId":"parentObjectId","image":"new value","parentCategoryId":`${categoriesCreated._id}`,"status":"new value","sortOrder":23});
const productsCreated = await app.service("products").Model.create({"userId":"parentObjectId","productIds":"parentObjectId","name":"new value","slug":"new value","sku":"new value","description":"new value","categoryId":`${categoriesCreated._id}`,"image":"new value","parentCategoryId":`${categoriesCreated._id}`,"status":"new value","sortOrder":23,"price":23,"discountPrice":23,"stockQuantity":23,"images":"new value","tags":"new value","isFeatured":true});

  beforeEach(async () => {
    thisService = await app.service("wishlists");

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
    assert.ok(thisService, "Registered the service (wishlists)");
  });

  describe("#create", () => {
    const options = {"userId":"parentObjectId","productIds":`${productsCreated._id}`,"name":"new value","slug":"new value","sku":"new value","description":"new value","categoryId":`${categoriesCreated._id}`,"image":"new value","parentCategoryId":`${categoriesCreated._id}`,"status":"new value","sortOrder":23,"price":23,"discountPrice":23,"stockQuantity":23,"images":"new value","tags":"new value","isFeatured":true};

    beforeEach(async () => {
      wishlistCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new wishlist", () => {
      assert.strictEqual(wishlistCreated.userId.toString(), options.userId.toString());
assert.strictEqual(wishlistCreated.productIds.toString(), options.productIds.toString());
    });
  });

  describe("#get", () => {
    it("should retrieve a wishlist by ID", async () => {
      const retrieved = await thisService.Model.findById(wishlistCreated._id);
      assert.strictEqual(retrieved._id.toString(), wishlistCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"userId":`${usersCreated._id}`,"productIds":`${productsCreated._id}`};

    it("should update an existing wishlist ", async () => {
      const wishlistUpdated = await thisService.Model.findByIdAndUpdate(
        wishlistCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(wishlistUpdated.userId.toString(), options.userId.toString());
assert.strictEqual(wishlistUpdated.productIds.toString(), options.productIds.toString());
    });
  });

  describe("#delete", async () => {
    it("should delete a wishlist", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("categories").Model.findByIdAndDelete(categoriesCreated._id);
await app.service("products").Model.findByIdAndDelete(productsCreated._id);;

      const wishlistDeleted = await thisService.Model.findByIdAndDelete(wishlistCreated._id);
      assert.strictEqual(wishlistDeleted._id.toString(), wishlistCreated._id.toString());
    });
  });
});