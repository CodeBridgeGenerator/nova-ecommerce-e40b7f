
import { faker } from "@faker-js/faker";
export default (user,count,categoryIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
name: faker.lorem.sentence(""),
slug: faker.lorem.sentence(""),
sku: faker.lorem.sentence(""),
description: faker.lorem.sentence(""),
categoryId: categoryIdIds[i % categoryIdIds.length],
price: faker.number.int(""),
discountPrice: faker.number.int(""),
stockQuantity: faker.number.int(""),
images: faker.lorem.sentence(""),
tags: faker.lorem.sentence(""),
status: faker.lorem.sentence(""),
isFeatured: faker.datatype.boolean(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
