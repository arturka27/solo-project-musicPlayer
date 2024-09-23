import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './HeaderPage.css';
import { AppContext } from '../../app/provider/AppContext';
function HeaderPage() {
  const { user } = useContext(AppContext);

  return (
    <div className="HeaderPage">
      <NavLink className="navlinkHome" to="/">
        <img
          className="logo"
          src="../../public/img/elbrus-music-logo.jpg"
          alt="logo"
          width={'100px'}
        />
      </NavLink>

      <h1>
        <h1 className='main-title'>~Elbrus Music~</h1>
      </h1>
      {user ? (
        <div className="user-block">
          <h2 className="hello-text">Привет, {user.name}!</h2>
          {/* {!user.isAdmin && (
            <NavLink className="navlink" to="/favorites">
              Избранное
            </NavLink>
          )} */}
          <NavLink className="btn" to="/logout">
            Выход
          </NavLink>
        </div>
      ) : (
        <div className="user-block">
          <NavLink className="btn" to="/authorization">
            Вход
          </NavLink>
          <NavLink className="btn" to="/registration">
            Регистрация
          </NavLink>
        </div>
      )}
    </div>
  );
}

export default HeaderPage;
