import { AVPlaybackStatus } from 'expo-av';
import { useSoundStore } from '../store';


const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
  if ('isPlaying' in status) {
    useSoundStore.setState({ isPlaying: status.isPlaying });
  }

  if (("positionMillis" in status) && ('durationMillis' in status)) {
    if (status.durationMillis) {
      useSoundStore.setState({ position: status.positionMillis, duration: status.durationMillis });
    }
  }
};

const progressBarPosition = () => {
  const duration = useSoundStore((state) => state.duration);
  const position = useSoundStore((state) => state.position);
  if (duration) return (position / duration) * 100;
  else return 0;
};



export {
  onPlaybackStatusUpdate,
  progressBarPosition,  
};