import algoliasearch from 'algoliasearch';

import productData from '../../data/products.json';

const client = algoliasearch('XROZKZHZJJ', 'e1377e524599692dc609d92e70c074ec');
const index = client.initIndex('products');

const setIndexSettings = () => {
  return index
    .setSettings({
      attributesForFaceting: ['categories', 'brand'],
      searchableAttributes: [
        'name',
        'description',
        'brand',
        'categories',
        'type',
      ],
    })
    .catch((err) => {
      console.warn('ERROR SETTING INDEX SETTINGS', err);
      return false;
    });
};

const sendDataToAlgolia = (data) => {
  return index
    .saveObjects(data, {
      autoGenerateObjectIDIfNotExist: true,
    })
    .catch((err) => {
      console.warn('ERROR SAVING OBJECTS', err);
      return false;
    });
};

const applyDiscountToData = (data) => {
  return data.map((product) => {
    const productIsCamera = product.categories.some(
      (category) => category.toLowerCase().indexOf('cameras') > -1
    );
    if (productIsCamera) {
      return {
        ...product,
        price: Math.floor(0.8 * product.price),
      };
    }
    return product;
  });
};

export const uploadTransformedData = () => {
  return setIndexSettings()
    .then(() => {
      return index.exists();
    })
    .then((indexExists) => {
      if (!indexExists) {
        const discountedCameras = applyDiscountToData(productData);
        return sendDataToAlgolia(discountedCameras);
      }
      return true;
    })
    .catch((err) => {
      console.warn('Error checking for existing object', err);
    });
};
