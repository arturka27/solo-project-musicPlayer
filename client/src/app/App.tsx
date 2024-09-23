import React, { useEffect, useMemo, useState } from 'react';

import type { AxiosResponse } from 'axios';
import type { Track } from '../entities/Track/types/track';
import TrackItem from '../entities/Track/ui/TrackItem';
import './App.css';
import { AppContext } from './provider/AppContext';
import AppRouters from './provider/AppRouters';
import { User } from '../entities/User/types/user';
import { axiosRequest, setAccessToken } from '../features/api/axiosinstance';
import HeaderPage from '../widgets/navbar/HeaderPage';

type TrackResponse = {
  message: string;
  tracks: Track[];
};

function App(): JSX.Element {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [user, setUser] = useState<User | undefined>(undefined);

  const checkUser = async () => {
    try {
      const response = await axiosRequest.get('/tokens/refresh');
      if (response.status === 200) {
        setAccessToken(response.data.accessToken);
        setUser(response.data.user);
      }
    } catch ({ response }: Response | any) {
      console.log(response.data.message);
    }
  };

  const getAllTracks = async () => {
    try {
      const response: AxiosResponse<TrackResponse> = await axiosRequest.get('/tracks');
      if (response.status === 200) {
        setTracks(response.data.tracks);
      }
    } catch ({ response }: Response | any) {
      console.log(response.data.message);
    }
  };

  useEffect(() => {
    getAllTracks();
    checkUser();
  }, []);

  const state = useMemo(
    () => ({
      tracks,
      setTracks,
      user,
      setUser,
    }),
    [tracks, user],
  );

  return (
    <AppContext.Provider value={state}>
      <HeaderPage/>
      <AppRouters />
    </AppContext.Provider>
  );
}

export default App;
