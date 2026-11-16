const products = require("./products/products.service.js");
const categories = require("./categories/categories.service.js");
const carts = require("./carts/carts.service.js");
const orders = require("./orders/orders.service.js");
const payments = require("./payments/payments.service.js");
const inventory = require("./inventory/inventory.service.js");
const coupons = require("./coupons/coupons.service.js");
const reviews = require("./reviews/reviews.service.js");
const wishlists = require("./wishlists/wishlists.service.js");
const shippingMethods = require("./shippingMethods/shippingMethods.service.js");
// ~cb-add-require-service-name~

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(products);
  app.configure(categories);
  app.configure(carts);
  app.configure(orders);
  app.configure(payments);
  app.configure(inventory);
  app.configure(coupons);
  app.configure(reviews);
  app.configure(wishlists);
  app.configure(shippingMethods);
    // ~cb-add-configure-service-name~
};
