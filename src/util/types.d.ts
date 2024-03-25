type MinimalTrackType = {
  color: string;
  title: string;
  duration: number;
  source: string;
}

type TrackType = MinimalTrackType & {
  startTime: number;
  endTime: number;
  startPoint: number;
  endPoint: number;
}

type FileType ={
  file: File;
  track: MinimalTrackType
}
