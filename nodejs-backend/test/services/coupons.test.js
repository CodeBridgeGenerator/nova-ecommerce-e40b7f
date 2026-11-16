const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("coupons service", async () => {
  let thisService;
  let couponCreated;
  let usersServiceResults;
  let users;

  

  beforeEach(async () => {
    thisService = await app.service("coupons");

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
    assert.ok(thisService, "Registered the service (coupons)");
  });

  describe("#create", () => {
    const options = {"code":"new value","description":"new value","discountType":"new value","discountValue":23,"minimumOrderAmount":23,"usageLimit":23,"usedCount":23,"startsAt":"2026-11-16T18:46:38.190Z","expiresAt":"2026-11-16T18:46:38.190Z","status":"new value"};

    beforeEach(async () => {
      couponCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new coupon", () => {
      assert.strictEqual(couponCreated.code, options.code);
assert.strictEqual(couponCreated.description, options.description);
assert.strictEqual(couponCreated.discountType, options.discountType);
assert.strictEqual(couponCreated.discountValue, options.discountValue);
assert.strictEqual(couponCreated.minimumOrderAmount, options.minimumOrderAmount);
assert.strictEqual(couponCreated.usageLimit, options.usageLimit);
assert.strictEqual(couponCreated.usedCount, options.usedCount);
assert.strictEqual(couponCreated.startsAt.toISOString(), options.startsAt);
assert.strictEqual(couponCreated.expiresAt.toISOString(), options.expiresAt);
assert.strictEqual(couponCreated.status, options.status);
    });
  });

  describe("#get", () => {
    it("should retrieve a coupon by ID", async () => {
      const retrieved = await thisService.Model.findById(couponCreated._id);
      assert.strictEqual(retrieved._id.toString(), couponCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"code":"updated value","description":"updated value","discountType":"updated value","discountValue":100,"minimumOrderAmount":100,"usageLimit":100,"usedCount":100,"startsAt":"2026-11-16T18:46:38.190Z","expiresAt":"2026-11-16T18:46:38.190Z","status":"updated value"};

    it("should update an existing coupon ", async () => {
      const couponUpdated = await thisService.Model.findByIdAndUpdate(
        couponCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(couponUpdated.code, options.code);
assert.strictEqual(couponUpdated.description, options.description);
assert.strictEqual(couponUpdated.discountType, options.discountType);
assert.strictEqual(couponUpdated.discountValue, options.discountValue);
assert.strictEqual(couponUpdated.minimumOrderAmount, options.minimumOrderAmount);
assert.strictEqual(couponUpdated.usageLimit, options.usageLimit);
assert.strictEqual(couponUpdated.usedCount, options.usedCount);
assert.strictEqual(couponUpdated.startsAt.toISOString(), options.startsAt);
assert.strictEqual(couponUpdated.expiresAt.toISOString(), options.expiresAt);
assert.strictEqual(couponUpdated.status, options.status);
    });
  });

  describe("#delete", async () => {
    it("should delete a coupon", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      ;

      const couponDeleted = await thisService.Model.findByIdAndDelete(couponCreated._id);
      assert.strictEqual(couponDeleted._id.toString(), couponCreated._id.toString());
    });
  });
});