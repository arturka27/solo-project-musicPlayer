import React, { Dispatch, FormEvent, SetStateAction, useContext, useState } from 'react';
import { axiosRequest } from '../../../features/api/axiosinstance';
import { AppContext } from '../../../app/provider/AppContext';
import './EditAddForm.css'
import { useNavigate } from 'react-router-dom';

type AppProps = { setActive: Dispatch<SetStateAction<boolean>> };

function TrackAddForm({ setActive }: AppProps): JSX.Element {
  const { setTracks, tracks } = useContext(AppContext);

  const [selectedFile, setSelectedFile] = useState<File | null | any>(null);
  const [title, setTitle] = useState<string>('');
  const [artist, setArtist] = useState<string>('');
  const [album, setAlbum] = useState<string>('');
  const navigate = useNavigate();

  const onHandleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (!selectedFile) return;

      const formData = new FormData();
      formData.append('title', title);
      formData.append('artist', artist);
      formData.append('album', album);
      formData.append('track', selectedFile);


      const response = await axiosRequest.post('/tracks', formData, {
        'Content-Type': 'multipart/form-data',
      });

      console.log(response, 11111111);

      if (response.status === 201) {
        setTracks((prev) => [...prev, response.data.track]);
        setSelectedFile(null);
        setTitle('');
        setAlbum('');
        setArtist('');
        setActive(false);
      }
    } catch (response: any) {
      console.log(response.data.message);
    }
  };

  return (
    <div className='edit-add-form'>
      <h1>Добавить трек</h1>
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
        <button className='btn' type="submit">добавить</button>
      </form>
    </div>
  );
}

export default TrackAddForm;
