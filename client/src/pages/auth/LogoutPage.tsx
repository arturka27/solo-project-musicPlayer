import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../app/provider/AppContext';
import { axiosRequest, setAccessToken } from '../../features/api/axiosinstance';


function LogoutPage() {
  const navigate = useNavigate();
const { user, setUser } = useContext(AppContext)


  const onHandleLogout = async () => {
    try {
      const response = await axiosRequest.delete('/auth/logout');
      if (response.data.message === 'success') {
        setAccessToken("");
        setUser(undefined);
        navigate('/')
      }
    } catch ({response} : Response | any) {
        console.log(response.data.message);
    }
  };

  return (
      <div className='logoutContainer'>
        <div className='confirmLogout'>{user?.name}, Вы точно хотите выйти?</div>
        <button className="logoutBtn" onClick={onHandleLogout} type="button">
          Да!
        </button>
        <button className="stayBtn" onClick={() => navigate(-1)} type="button">
          Нет, хочу остаться
        </button>
      </div>
  );
}

export default LogoutPage;