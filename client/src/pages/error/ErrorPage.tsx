import React from'react';
import "./ErrorPage.css"
function ErrorPage() {
  return (
        <div className='ErrorPage' style={{ textAlign: 'center', padding: '50px' }}>
            <p>Страница не найдена</p>
            <a className='btn' href="/" >Перейти на главную страницу</a>
            <img width={'450px'} src='/public/img/elbrus-music-404.jpg' />
        </div>
  );
}

export default ErrorPage;