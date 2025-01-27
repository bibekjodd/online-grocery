export const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const dummyUserImage = 'https://avatars.githubusercontent.com/u/110604197?v=4';
export const dummyProductImage =
  'https://hips.hearstapps.com/hmg-prod/images/healthy-groceries-bag-66eaef810acf6.jpg?crop=0.7501082719792118xw:1xh;center,top&resize=1200:*';

export const MILLIS = {
  SECOND: 1000,
  MINUTE: 60 * 1000,
  HOUR: 60 * 60 * 1000,
  DAY: 24 * 60 * 60 * 1000,
  WEEK: 7 * 24 * 60 * 60 * 1000,
  MONTH: 30 * 24 * 60 * 60 * 1000
};

export const productCategories = [
  { title: 'Fruits', value: 'fruits' },
  { title: 'Vegetables', value: 'vegetables' }
] as const;
