import {describe, expect, it} from 'vitest';
import '@testing-library/jest-dom';
import {PRODUCTS} from '../src/product';

describe(
  'Product',
  () =>
    it(
      'Assert that all images are used',
      () => {
        const images = import.meta.glob('/public/images/*.{png,jpg,webp}', {eager: true});
        delete images['/public/images/favicon.ico'];

        const usage: Record<string, boolean> = {}
        for (const image in images) {
          usage[image.substring(image.lastIndexOf('/') + 1)] = false;
        }

        PRODUCTS.forEach(product => usage[product.image] = true);
        Object.keys(usage).forEach(image => expect(usage[image], `${image} is unused.`).toBeTruthy());
      },
    ),
);
