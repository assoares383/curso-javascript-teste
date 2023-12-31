import { mount } from '@vue/test-utils';
import ProductCard from '@/components/ProductCard';
import { makeServer } from '@/miragejs/server';
import { CartManager } from '@/managers/CartManager';

let server;

const mountProductCard = () => {
  const product = server.create('product', {
    title: 'Relogio bonito',
    price: '$440.23',
    image:
      'https://images.unsplash.com/photo-1526045431048-f857369baa09?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
  });

  const cartManager = new CartManager();

  const wrapper = mount(ProductCard, {
    propsData: {
      product,
    },
    mocks: {
      $cart: cartManager,
    },
  });

  return {
    wrapper,
    product,
    cartManager,
  };
};

describe('ProductCard - Unit', () => {
  beforeEach(() => {
    server = makeServer({ environment: 'test' });
  });

  afterEach(() => {
    server.shutdown();
  });

  it('should match snapshot', () => {
    const { wrapper } = mountProductCard();
    expect(wrapper.element).toMatchSnapshot();
  });

  it('should mount the component', () => {
    const { wrapper } = mountProductCard();
    expect(wrapper.vm).toBeDefined();
    expect(wrapper.text()).toContain('Relogio bonito');
    expect(wrapper.text()).toContain('$440.23');
  });

  it('should add item to cartState on button click', async () => {
    const { wrapper, cartManager, product } = mountProductCard();
    const spy1 = jest.spyOn(cartManager, 'open');
    const spy2 = jest.spyOn(cartManager, 'addProduct');

    await wrapper.find('button').trigger('click');

    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledWith(product);
  });
});
