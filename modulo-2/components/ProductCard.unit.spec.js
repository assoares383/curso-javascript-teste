import { mount } from '@vue/test-utils';
import ProductCard from '@/components/ProductCard';
import { makeServer } from '@/miragejs/server';

let server;

const mountProductCard = () => {
  const product = server.create('product', {
    title: 'Relogio bonito',
    price: '$440.23',
    image:
      'https://images.unsplash.com/photo-1526045431048-f857369baa09?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
  });

  return {
    wrapper: mount(ProductCard, {
      propsData: {
        product,
      },
    }),
    product,
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

  it('should emit the event addToCart with product object when button gets clicked', async () => {
    const { wrapper, product } = mountProductCard();

    await wrapper.find('button').trigger('click');

    expect(wrapper.emitted().addToCart).toBeTruthy();
    expect(wrapper.emitted().addToCart.length).toBe(1);
    expect(wrapper.emitted().addToCart[0]).toEqual([{ product }]);
  });
});
