import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosRequest, setAccessToken } from '../../features/api/axiosinstance';
import { AppContext } from '../../app/provider/AppContext';
import './RegLog.css';

function RegistrationPage() {
  const { setUser } = useContext(AppContext);

  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirm, setConfirm] = useState<string>('');
  const [shown, setShown] = useState<boolean>(false);

  function validation(name: string, email: string, password: string, confirm: string) {
    if (
      name.trim() === '' ||
      email.trim() === '' ||
      password.trim() === '' ||
      confirm.trim() === ''
    ) {
      setError('Заполните поле');
      return false;
    }
    if (password.trim().length < 4) {
      setError('Пароль не может быть короче 4-х символов');
      return false;
    }
    if (password.trim() !== confirm.trim()) {
      setError('Пароли не совпадают');
      return false;
    }
    return true;
  }

  const onHandleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validation(name, email, password, confirm)) {
      return;
    }

    try {
      const response = await axiosRequest.post('/auth/registration', {
        name: name.trim(),
        email: email.trim(),
        password: password.trim(),
      });

      if (response.data.message === 'success') {
        setAccessToken(response.data.accessToken);
        setUser(response.data.user);
        navigate('/');
        return;
      }
    } catch ({ response }: Response | any) {
      console.log(response);
      setError(response.data.message);
    }
  };

  return (
    <div className="RegLog">
      <form onSubmit={onHandleSubmit} className="regLogForm">
        <h2>Создать профиль</h2>
        <input
          required
          className="maininput"
          type="text"
          placeholder="Ваше имя"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          required
          type="email"
          className="maininput"
          placeholder="email@xxx.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          minLength={5}
        />
        {/* <input
            type={shown? 'text' : 'password'}
            className="maininput"
            placeholder="Пароль"
            value={password}
            required
            minLength={3}
            onChange={(event) => setPassword(event.target.value)}
          /> */}
        {/* <input
          required
          type={shown ? "text" : "password"}
          className="maininput"
          placeholder="Подтвердите пароль"
          value={confirm}
          onChange={(event) => setConfirm(event.target.value)}
        /> */}
        <label className="password-label">
          <input
            type={shown ? 'text' : 'password'}
            onChange={({ target }) => setPassword(target.value)}
            className="maininput"
            placeholder="Пароль"
            required
          />
          <button
            className="eye-button-auth"
            type="button"
            onClick={() => setShown((prev) => !prev)}
          >
            👀
          </button>
        </label>{' '}
        <label className="password-label">
          <input
            required
            type={shown ? 'text' : 'password'}
            className="maininput"
            placeholder="Подтвердите пароль"
            value={confirm}
            onChange={(event) => setConfirm(event.target.value)}
          />
          {/* <button
            className="eye-button"
            type="button"
            onClick={() => setShown((prev) => !prev)}
          >
            👀
          </button> */}
        </label>
        <div className="error">{error && <p>{error}</p>}</div>
        <button className="btn" type="submit">
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
}

export default RegistrationPage;
