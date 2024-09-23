import { createContext, SetStateAction } from 'react';
import type { Track } from '../../entities/Track/types/track';
import { User } from '../../entities/User/types/user';

type InitialState = {
  tracks: Track[];
  setTracks: (state: SetStateAction<Track[]>) => void;
  user: User | undefined;
  setUser: (state: SetStateAction<User | undefined>) => void;
};

export const initialState: InitialState = {
  tracks: [],
  setTracks: () => {},
  user: undefined,
  setUser: () => {}
};

export const AppContext = createContext(initialState);