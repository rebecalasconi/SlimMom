import React from 'react';

const DiaryProductsListItem = ({ product, removeProduct }) => {
  return (
    <li className="product-item">
      <span>{product.name}</span> - {product.grams}g - {product.calories} kcal
      <button onClick={removeProduct} className="remove-btn">X</button>
    </li>
  );
};

export default DiaryProductsListItem;
