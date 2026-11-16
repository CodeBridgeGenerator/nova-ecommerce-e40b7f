
import { faker } from "@faker-js/faker";
export default (user,count,productIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
productId: productIdIds[i % productIdIds.length],
quantity: faker.number.int(""),
reorderLevel: faker.number.int(""),
lastRestockedAt: faker.date.recent(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
