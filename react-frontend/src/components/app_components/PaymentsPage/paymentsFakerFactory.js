
import { faker } from "@faker-js/faker";
export default (user,count,orderIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
orderId: orderIdIds[i % orderIdIds.length],
transactionId: faker.lorem.sentence(""),
paymentMethod: faker.lorem.sentence(""),
amount: faker.number.int(""),
status: faker.lorem.sentence(""),
paidAt: faker.date.recent(""),
response: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
