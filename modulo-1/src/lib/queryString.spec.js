import { queryString, parse } from './queryString';

describe('Object to query string', () => {
  it('should create a valid query string when a object is provided', () => {
    const obj = {
      name: 'Alexandre',
      profession: 'developer',
    };

    expect(queryString(obj)).toBe('name=Alexandre&profession=developer');
  });

  it('should create a valid query string even when a array is passed as value', () => {
    const obj = {
      name: 'Alexandre',
      abilities: ['JS', 'TDD'],
    };

    expect(queryString(obj)).toBe('name=Alexandre&abilities=JS,TDD');
  });

  it('should throw an error when an object is passed as value', () => {
    const obj = {
      name: 'Alexandre',
      abilities: {
        first: 'JS',
        second: 'TDD',
      },
    };

    expect(() => {
      queryString(obj);
    }).toThrowError();
  });
});

describe('Query string to Object', () => {
  it('should convert a query string to object', () => {
    const qs = 'name=Alexandre&profession=developer';

    expect(parse(qs)).toEqual({
      name: 'Alexandre',
      profession: 'developer',
    });
  });

  it('should convert a query string of a single key-value pair to object', () => {
    const qs = 'name=Alexandre';

    expect(parse(qs)).toEqual({
      name: 'Alexandre',
    });
  });

  it('should convert a query string to an object taking care of comma separates value', () => {
    const qs = 'name=Alexandre&abilities=JS,TDD';

    expect(parse(qs)).toEqual({
      name: 'Alexandre',
      abilities: ['JS', 'TDD'],
    });
  });
});
