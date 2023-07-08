import { faker } from '@faker-js/faker';
import { Factory } from 'miragejs';

import { randomNumber } from './utils';

export default {
  user: Factory.extend({
    name() {
      return faker.commerce.productName();
    },
    mobile() {
      return faker.phone.number();
    },
    afterCreate(user, server) {
      const messages = server.createList('message', randomNumber(10), { user });

      user.update({ messages });
    },
  }),
};
