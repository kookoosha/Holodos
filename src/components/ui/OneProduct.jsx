import React, { useState } from 'react';

export default function OneProduct({ product, deletHandler }) {
  // EDIT
  const [isEdit, setIsEdit] = useState(false);
  const editHandler = (e) => {
    setIsEdit((prev) => !prev);
  };
  const [editInput, setEditInput] = useState(product || {
    name: '',
  });

  const changeInputHandler = (e) => {
    setEditInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const editSaveHandler = async (e) => {
    setIsEdit((prev) => !prev);
    await fetch(
      `/holodos/${product.id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editInput),
      },
    );
  };
  return (
    <div className="card" style={{ width: '18rem' }}>
      <img src={`${product.url}`} className="card-img-top" alt="..." />
      <div className="card-body">
        <div>
          <h6>Название продукта</h6>
          {isEdit && <input name="name" onChange={changeInputHandler} value={editInput.name} />}
          {!isEdit && <p className="card-title">{editInput.name}</p>}

        </div>
        <div>
          <h6>Категория</h6>
          <p className="card-title">{product.Category.name}</p>
        </div>
        {isEdit && <button onClick={() => editSaveHandler()} type="button" className="btn btn-outline-warning btn-sm">save</button>}
        {!isEdit && <button onClick={() => editHandler()} type="button" className="btn btn-outline-warning btn-sm">Edit</button>}

        <button onClick={() => deletHandler(product.id)} type="button" className="btn btn-outline-danger btn-sm">X</button>
      </div>
    </div>
  );
}
