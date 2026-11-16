const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("categories service", async () => {
  let thisService;
  let categoryCreated;
  let usersServiceResults;
  let users;

  const categoriesCreated = await app.service("categories").Model.create({"name":"new value","description":"new value","image":"new value","parentCategoryId":"parentObjectId","status":"new value","sortOrder":23});

  beforeEach(async () => {
    thisService = await app.service("categories");

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
    assert.ok(thisService, "Registered the service (categories)");
  });

  describe("#create", () => {
    const options = {"name":"new value","description":"new value","image":"new value","parentCategoryId":`${categoriesCreated._id}`,"status":"new value","sortOrder":23};

    beforeEach(async () => {
      categoryCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new category", () => {
      assert.strictEqual(categoryCreated.name, options.name);
assert.strictEqual(categoryCreated.description, options.description);
assert.strictEqual(categoryCreated.image, options.image);
assert.strictEqual(categoryCreated.parentCategoryId.toString(), options.parentCategoryId.toString());
assert.strictEqual(categoryCreated.status, options.status);
assert.strictEqual(categoryCreated.sortOrder, options.sortOrder);
    });
  });

  describe("#get", () => {
    it("should retrieve a category by ID", async () => {
      const retrieved = await thisService.Model.findById(categoryCreated._id);
      assert.strictEqual(retrieved._id.toString(), categoryCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"name":"updated value","description":"updated value","image":"updated value","parentCategoryId":`${categoriesCreated._id}`,"status":"updated value","sortOrder":100};

    it("should update an existing category ", async () => {
      const categoryUpdated = await thisService.Model.findByIdAndUpdate(
        categoryCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(categoryUpdated.name, options.name);
assert.strictEqual(categoryUpdated.description, options.description);
assert.strictEqual(categoryUpdated.image, options.image);
assert.strictEqual(categoryUpdated.parentCategoryId.toString(), options.parentCategoryId.toString());
assert.strictEqual(categoryUpdated.status, options.status);
assert.strictEqual(categoryUpdated.sortOrder, options.sortOrder);
    });
  });

  describe("#delete", async () => {
    it("should delete a category", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("categories").Model.findByIdAndDelete(categoriesCreated._id);;

      const categoryDeleted = await thisService.Model.findByIdAndDelete(categoryCreated._id);
      assert.strictEqual(categoryDeleted._id.toString(), categoryCreated._id.toString());
    });
  });
});