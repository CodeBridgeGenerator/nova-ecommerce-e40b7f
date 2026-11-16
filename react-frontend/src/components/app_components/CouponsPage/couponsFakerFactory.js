
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
code: faker.lorem.sentence(""),
description: faker.lorem.sentence(""),
discountType: faker.lorem.sentence(""),
discountValue: faker.number.int(""),
minimumOrderAmount: faker.number.int(""),
usageLimit: faker.number.int(""),
usedCount: faker.number.int(""),
startsAt: faker.date.recent(""),
expiresAt: faker.date.recent(""),
status: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
