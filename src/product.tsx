import psu from './products.json';

interface Product {
  image: string;
  name: string;
  year: string;
  tier: string;
  wattage: number[];
  efficiency: string;
  modular: string;
}

const PRODUCTS: Product[] = psu;

export type {Product};
export {PRODUCTS};
