import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../app/provider/AppContext';
import ModalWindow from '../../shared/ui/Modal/Modal';
import TrackAddForm from '../../entities/Track/ui/TrackAddForm';
import TrackItem from '../../entities/Track/ui/TrackItem';
import './TrackPage.css'

function TrackPage(): JSX.Element {
  const { setTracks, tracks } = useContext(AppContext);
  const [active, setActive] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null | any>(null);

  const onHandleShowForm = async () => {
    setActive((prev) => !prev);
  };

  return (
    <div className="TrackPage">
      {active ? (
        <ModalWindow active={active} setActive={setActive}>
          <TrackAddForm setActive={setActive} />
        </ModalWindow>
      ) : (
        <button className='btn' onClick={onHandleShowForm}>добавить трек</button>
      )}
      <div className='TrackItemBlock'>{tracks && tracks.map((track) => <TrackItem key={track.id} track={track} />)}</div>
    </div>
  );
}

export default TrackPage;
