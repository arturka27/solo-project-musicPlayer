export type Track = {
    id: number;
    title: string;
    artist: string;
    album: string;
    filePath: string;
  };
  
  export type TrackWithoutId = Omit<Track, 'id'>;
  
  export type TrackId = Track['id'];