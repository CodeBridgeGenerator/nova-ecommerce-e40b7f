
import { faker } from "@faker-js/faker";
export default (user,count,productIdIds,userIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
productId: productIdIds[i % productIdIds.length],
userId: userIdIds[i % userIdIds.length],
rating: faker.number.int(""),
comment: faker.lorem.sentence(""),
status: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
