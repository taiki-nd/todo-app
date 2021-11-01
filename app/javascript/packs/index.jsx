import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom';
import App from '../components/App'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    // <App />を<BrowserRouter>で囲むことで、<App />とその子要素でBrowserRouterを使えるようにしている
    document.querySelector('#root'),
    // app/views/top/index.html.erbからid="root"を選択肢そこに<App />を描画している。
  );
});