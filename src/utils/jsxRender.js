import React from 'react';
import { renderToString } from 'react-dom/server';// Подключение метода для перевода React компонента в строку
import Layout from '../components/Layout';

export default function jsxRender(_, initState, cb) {
  // Создаём реакт-компонент, содержащий разметку страницы
  const layout = React.createElement(Layout, { initState });
  const html = renderToString(layout); // Переводим этот компонент в строку
  // Возвращаем callback с html страницей
  return cb(null, `<!DOCTYPE html>${html}`);
}