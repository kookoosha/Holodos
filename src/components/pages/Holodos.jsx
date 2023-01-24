import React, { useState } from 'react';
import AddCard from '../ui/AddCard';
import Items from '../ui/Items';

export default function Holodos({ allCategory, allProducts }) {
  const [products, setProducts] = useState(allProducts || []);
  // Product
  const [inputProduct, setInputProduct] = useState({
    name: '',
    category_id: '',
    url: '',
  });
  const inputProductHandler = (e) => {
    setInputProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const productHandler = (e) => {
    e.preventDefault();
    fetch('/holodos/addProduct', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputProduct),
    })
      .then((res) => res.json())
      .then((data) => setProducts((prev) => [data, ...prev]));
  };

  // DELETE PRODUCT
  const deletHandler = (id) => {
    fetch(`/holodos/${id}`, { method: 'DELETE' })
      .then(() => setProducts((prev) => prev.filter((product) => product.id != id)))
      .catch(console.log);
  };
  // EDIT
  // const [isEdit, setIsEdit] = useState(false);
  // const editHandler = (e) => {
  //   setEdit((prev) => !prev);
  // };

  return (
    <div className="container">
      <div className="row">
        <div className="col-5 mt-3">
          <AddCard
            inputProduct={inputProduct}
            productHandler={productHandler}
            inputProductHandler={inputProductHandler}
            allCategory={allCategory}
          />
        </div>
        <div className="col-5 mt-3 ml-3">
          <Items
            deletHandler={deletHandler}
            products={products}
          />
        </div>
      </div>
    </div>
  );
}
