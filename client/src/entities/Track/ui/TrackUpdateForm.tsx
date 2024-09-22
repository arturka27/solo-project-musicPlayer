import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import { AppContext } from '../../../app/provider/AppContext';
import { axiosRequest } from '../../../features/api/axiosinstance';
import { Track } from '../types/track';
import "./EditAddForm.css"

type AppProps = {
  track: Track;
  setActive: Dispatch<SetStateAction<boolean>>;
};

function TrackUpdateForm({ track, setActive }: AppProps): JSX.Element {
  const { setTracks } = useContext(AppContext);
  const [selectedFile, setSelectedFile] = useState<File | null | any>(null);
  const [title, setTitle] = useState<string>(track.title);
  const [artist, setArtist] = useState<string>(track.artist);
  const [album, setAlbum] = useState<string>(track.album);


  const onHandleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axiosRequest.put(`/tracks/${track.id}`, {
        title,
        artist,
        album,
      });

      if (response.status === 200) {
        setTracks((prev) => prev.map((t) => (t.id === track.id ? response.data.track : t)));
        setActive(false);
      }
    } catch ({ response }: any) {
      console.log(response.data.message);
    }
  };

  return (
    <div className='edit-add-form'>
      <h1>Обновить трек</h1>
      <form onSubmit={(event) => onHandleSubmit(event)}>
        <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} />
        <input
          type="text"
          placeholder="название"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          name=""
          id=""
        />
        <input
          type="text"
          placeholder="артист"
          onChange={(e) => setArtist(e.target.value)}
          value={artist}
          name=""
          id=""
        />
        <input
          type="text"
          placeholder="альбом"
          onChange={(e) => setAlbum(e.target.value)}
          value={album}
          name=""
          id=""
        />
        <button className='btn' type="submit">обновить</button>
      </form>
    </div>
  );
}
export default TrackUpdateForm;
