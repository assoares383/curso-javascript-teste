import { faker } from '@faker-js/faker';
import { Factory } from 'miragejs';

export default {
  message: Factory.extend({
    content() {
      return faker.lorem.paragraph();
    },
    date() {
      const date = new Date(faker.date.past());
      return date.toLocaleDateString();
    },
  }),
};
