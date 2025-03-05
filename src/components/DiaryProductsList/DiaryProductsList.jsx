import React from 'react';
import DiaryProductsListItem from '../DiaryProductsListItem/DiaryProductsListItem';

const DiaryProductsList = ({ products, removeProduct }) => {
  return (
    <div className="product-list">
        <ul>
          {products.map((product, index) => (
            <DiaryProductsListItem
              key={index}
              product={product}
              removeProduct={() => removeProduct(index)}
            />
          ))}
        </ul>
      
    </div>
  );
};

export default DiaryProductsList;
