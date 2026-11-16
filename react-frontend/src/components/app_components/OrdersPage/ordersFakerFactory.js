
import { faker } from "@faker-js/faker";
export default (user,count,userIdIds,shippingAddressIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
orderNumber: faker.lorem.sentence(""),
userId: userIdIds[i % userIdIds.length],
items: faker.lorem.sentence(""),
shippingAddressId: shippingAddressIdIds[i % shippingAddressIdIds.length],
subtotal: faker.number.int(""),
shippingFee: faker.number.int(""),
discount: faker.number.int(""),
total: faker.number.int(""),
paymentStatus: faker.lorem.sentence(""),
orderStatus: faker.lorem.sentence(""),
orderedAt: faker.date.recent(""),
notes: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
