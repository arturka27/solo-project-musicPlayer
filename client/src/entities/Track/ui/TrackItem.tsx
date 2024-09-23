import { AppContext } from '../../../app/provider/AppContext';
import { Track } from '../types/track';
import React, { useContext, useEffect, useState } from 'react';
import type { AxiosResponse } from 'axios';
import Button, { ThemeButton } from '../../../shared/ui/Button/Button';
import { axiosRequest } from '../../../features/api/axiosinstance';
import ModalWindow from '../../../shared/ui/Modal/Modal';
import TrackUpdateForm from './TrackUpdateForm';
import { Howl, Howler } from 'howler';
import './TrackItem.css';

export type TrackItemProps = {
  track: Track;
};

type TrackResponse = {
  message: string;
};

function TrackItem({ track }: TrackItemProps): JSX.Element {
  const { setTracks, tracks, user } = useContext(AppContext);
  const [active, setActive] = useState<boolean>(false);
  const [soundTrack, setSoundTrack] = useState(null);
  const [playing, setPlaying] = useState(false);

  const handleDelete = async (): Promise<void> => {
    const response: AxiosResponse<TrackResponse> = await axiosRequest.delete(`/tracks/${track.id}`);
    if (response.status === 200 && response.data.message === 'success') {
      setTracks((prev) => prev.filter((t) => t.id !== track.id));
    }
  };

  const onHandleShowForm = async () => {
    setActive((prev) => !prev);
  };

  const onHandlePlay = async () => {
    if (soundTrack) {
      setPlaying(true);
      soundTrack.play();
    }
  };

  const onHandleStop = async () => {
    soundTrack.pause();
    setPlaying(false);
  };

  const getTrack = async () => {
    setSoundTrack(
      new Howl({
        src: [track.filePath, 'sound.mp3'],
        html5: true,
      }),
    );
  };

  useEffect(() => {
    getTrack();
  }, []);

  return (
    <div className="TrackItem">
      <div className="info-block">
        <h1 className='title'>{track.title}</h1>
        <h3 className='artist'>{track.artist}</h3>
        <p className='album'>{track.album}</p>
      </div>
      {/* <audio controls>
        <source src={track.filePath} type="audio/mpeg"/>
        ваш браузер не поддерживает элемент audio
      </audio> */}
      <div className="setting-block">
        {soundTrack && (
          <div className='pla-stop'>
            {playing ? (
              <button className="stop-button" onClick={onHandleStop}>
                ⏸️
              </button>
            ) : (
              <button className="play-button" onClick={onHandlePlay}>
                ▶️
              </button>
            )}
          </div>
        )}
        {user && user.id === track.userId && <div className='edit'>
          {active ? (
          <ModalWindow active={active} setActive={setActive}>
            <TrackUpdateForm track={track} setActive={setActive} />
          </ModalWindow>
        ) : (
          <button className='btn btn-update' onClick={onHandleShowForm}>обновить трек</button>
        )}
        <Button className='btn btn-delete' theme={ThemeButton.DANGER} onClick={handleDelete}>
          Удалить
        </Button>
          </div>}

      </div>
    </div>
  );
}

export default TrackItem;
