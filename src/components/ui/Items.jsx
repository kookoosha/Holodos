import React from 'react';
import OneProduct from './OneProduct';

export default function Items({ deletHandler, products }) {
  return (
    <div>
      {products?.map((el) => (
        <OneProduct
          key={el.id}
          deletHandler={deletHandler}
          product={el}
        />
      ))}

    </div>
  );
}
