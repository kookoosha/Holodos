import React, { useState } from 'react';

export default function addCard({
  allCategory, inputProductHandler, productHandler, inputProduct,
}) {
  // Стейт для категорий
  const [allCAtegoryState, setAllCAtegoryState] = useState(allCategory || []);

  // CATEGORY
  const [inputCategory, setInputCategory] = useState({
    name: '',
  });
  const inputCategoryHandler = (e) => {
    setInputCategory((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const categoryHandler = (e) => {
    e.preventDefault();
    fetch('/holodos/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputCategory),
    })
      .then((res) => res.json())

      .then((data) => setAllCAtegoryState((prev) => [data, ...prev]));
  };

  // PRODUCT
  // const [inputProduct, setInputProduct] = useState({
  //   name: '',
  //   category_id: '',
  //   url: '',
  // });
  // const inputProductHandler = (e) => {
  //   setInputProduct((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  // };
  // const productHandler = (e) => {
  //   e.preventDefault();
  //   fetch('/holodos/addProduct', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(inputProduct),
  //   })
  //     .then((res) => res.json())
  //     .then(console.log);

  //   // .then((data) => setAllCAtegoryState((prev) => [data, ...prev]));
  // };

  // console.log('inputProduct', inputProduct);

  return (
    <>
      <h6>Что будем хранить в холодильнике?</h6>
      <p>Заполни форму, если хочешь добавить новую категорию в холодильник </p>
      <form onSubmit={categoryHandler}>
        <div className="input-group">
          <span className="input-group-text" />
          <input onChange={inputCategoryHandler} value={inputCategory.name} name="name" placeholder="категория" type="text" className="form-control" />
        </div>
        <button type="submit" className="btn btn-outline-success">Добавить категорию</button>
      </form>

      <h6 className="mt-5">Добавим продукт в холодильник?</h6>
      <form onSubmit={productHandler}>
        <div className="input-group">
          <span className="input-group-text" />
          <input
            onChange={inputProductHandler}
            value={inputProduct.name}
            name="name"
            placeholder="название продукта"
            type="text"
            className="form-control"
          />
        </div>

        <div className="input-group mb-3">
          {/* <label className="input-group-text" htmlFor="inputGroupSelect01">Категория</label> */}
          <select
            onChange={inputProductHandler}
            // value={inputProduct.category_id}
            name="category_id"
            className="form-select"
            id="inputGroupSelect01"
          >
            {allCAtegoryState?.map((el) => <option key={el.id} value={`${el.id}`}>{el.name}</option>)}

          </select>
        </div>
        <div className="input-group mb-3">
          <input
            onChange={inputProductHandler}
            value={inputProduct.url}
            name="url"
            placeholder="ссылка на картинку"
            type="text"
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-outline-success">Добавить продукт</button>
      </form>
    </>
  );
}
