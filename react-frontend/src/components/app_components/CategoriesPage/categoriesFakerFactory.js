
import { faker } from "@faker-js/faker";
export default (user,count,parentCategoryIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
name: faker.lorem.sentence(""),
description: faker.lorem.sentence(""),
image: faker.lorem.sentence(""),
parentCategoryId: parentCategoryIdIds[i % parentCategoryIdIds.length],
status: faker.lorem.sentence(""),
sortOrder: faker.number.int(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
