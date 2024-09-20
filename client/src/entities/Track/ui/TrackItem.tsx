import { AppContext } from "../../../app/provider/AppContext";
import { Track } from "../types/track"
import React, {useContext} from 'react';
import type { AxiosResponse } from 'axios';
import axios from 'axios';
import Button, { ThemeButton } from '../../../shared/ui/Button/Button';


type TrackItemProps = {
    track: Track;
}

type TrackResponse = {
    message: string;
}

function TrackItem({ track }: TrackItemProps): JSX.Element {
    const { setTracks } = useContext(AppContext);
    const handleDelete = async (): Promise<void> => {
      const response: AxiosResponse<TrackResponse> = await axios.delete(
        `/api/tracks/${track.id}`,
      );
      if (response.status === 200 && response.data.message === 'success') {
        setTracks((prev) => prev.filter((t) => t.id !== track.id));
      }
    };
  
    return (
      <div className="trackItem">
        <h1>{track.title}</h1>
        <p>{track.artist}</p>
        <p>{track.album}</p>
        <Button theme={ThemeButton.DANGER} onClick={handleDelete}>
          Удалить
        </Button>
      </div>
    );
  }
  

export default TrackItem;