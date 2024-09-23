import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../app/provider/AppContext';
import { axiosRequest, setAccessToken } from '../../features/api/axiosinstance';
import './RegLog.css';

function LogoutPage() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AppContext);

  const onHandleLogout = async () => {
    try {
      const response = await axiosRequest.delete('/auth/logout');
      if (response.data.message === 'success') {
        setAccessToken('');
        setUser(undefined);
        navigate('/');
      }
    } catch ({ response }: Response | any) {
      console.log(response.data.message);
    }
  };

  return (
    <div className="RegLog">
      {user && (
        <div className="confirmLogout">
          <div>{user?.name}, Вы точно хотите выйти?</div>
          <button className="btn" onClick={onHandleLogout} type="button">
            Да!
          </button>
          <button className="btn" onClick={() => navigate(-1)} type="button">
            Нет, хочу остаться
          </button>
        </div>
      )}
    </div>
  );
}

export default LogoutPage;
