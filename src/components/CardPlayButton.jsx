import { Pause, Play } from "./Player";
import { usePlayerStore } from "@/store/playerStore";

export function CardPlayButton({ id }) {
  const { isPlaying, setIsPlaying, currentMusic, setCurrentMusic } =
    usePlayerStore((state) => state);

  const isPlayingPlaylist = isPlaying && currentMusic?.playlist.id === id;

  const handlePlay = () => {
    if (isPlayingPlaylist) {
      setIsPlaying(false);
      return;
    }

    fetch(`/api/get-info-playlist.json?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        const { playlist, songs } = data;

        setIsPlaying(true);
        setCurrentMusic({ playlist, song: songs[0], songs });
      });
  };

  return (
    <button
      className="card-play-button rounded-full bg-green-500 p-3"
      onClick={handlePlay}
    >
      {isPlayingPlaylist ? <Pause /> : <Play />}
    </button>
  );
}
