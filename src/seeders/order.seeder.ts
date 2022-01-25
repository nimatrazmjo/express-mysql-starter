import { randomInt } from "crypto";
import { getRepository } from "typeorm";

import { connectionToDB } from "../config/database";
import { OrderItem } from "../entity/order-item.entity";
import { Order } from "../entity/order.entity";

connectionToDB().then(async () => {
  const orderRepository = getRepository(Order);
  const orderItemRepository = getRepository(OrderItem);
  for (let i = 0; i < 30; i++) {
    // const order = await orderRepository.save({
    //   user_id: randomInt(2, 31),
    //   code: faker.random.alphaNumeric(6),
    //   ambassador_email: faker.internet.email(),
    //   first_name: faker.name.first_name(),
    //   last_name: faker.name.last_name(),
    //   email: faker.internet.email(),
    //   complete: true,
    // });

    // for (let j = 0; j < randomInt(1,5); j++) {
    //   await orderItemRepository.save({
    //     order,
    //     product_title: faker.lorem.words(2),
    //     price: randomInt(10, 100),
    //     quantity: randomInt(1, 5),
    //     admin_revenue: randomInt(10, 100),
    //     ambassador_revenue: randomInt(10,50)
    //   })
    // }
  }
  process.exit();
});
