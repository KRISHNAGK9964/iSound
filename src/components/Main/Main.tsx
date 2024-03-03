// framework modules/ APIs
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

// internal modules/ data
import { PauseIcon, PlayIcon } from "../../../public/assets/svgIcons";
import { tracks } from "@/data/tracks";

// type declarations
type trackType = (typeof tracks)[0];
type Props = {};

const Main = (props: Props) => {
  // states of the component(Timeline Track) i.e current time, play/pause, playback speed, tracks etc. ------------------------------------------------- //
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [timeLineTracks, setTimeLineTracks] = useState<trackType[]>([]);
  const [intervalID, setintervalID] = useState<NodeJS.Timeout>();

  // reference to the DOM Elements of(Timeline Track) i.e timeline container,  timeline thumb, track container, track, audio etc. ----------------------- //
  const timeLineRef = useRef<HTMLDivElement | null>(null);
  const timeRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<Array<HTMLDivElement>>(new Array());
  const thumbRef = useRef<Array<HTMLDivElement>>(new Array());
  const audioRef = useRef<Array<HTMLAudioElement>>(new Array());

  /**
   * @description The following hook triggers on changing state(play/pause) of Timeline Track.
   * It sets an timeinterval for which the state(time) is updated and tracks that are overlapping are played, others are paused.
   */
  useEffect(() => {
    if (playing) {
      const ID = setInterval(async () => {
        // console.log(time);
        // console.log(audioRef.current);
        setTime((old) => {
          if (old >= 30000) {
            setPlaying(false);
            return 30000;
          } else {
            let cspeed = speed;
            // setSpeed(old => {cspeed = old; return old;})
            let nt = old + 200 * cspeed;
            // console.log(cspeed);
            timeLineTracks.map((tt, index) => {
              if (tt.startTime <= nt && nt <= tt.startTime + tt.duration) {
                audioRef.current[index].play();
              }
              if (nt >= tt.startTime + tt.duration) {
                audioRef.current[index].pause();
                audioRef.current[index].currentTime = 0;
              }
              return null;
            });
            return nt;
          }
        });
      }, 200);
      setintervalID(ID);
    } else {
      // console.log(intervalID);
      timeLineTracks.map((tt, index) => {
        audioRef.current[index].pause();
        return null;
      });
      clearInterval(intervalID);
    }
    return () => {
      clearInterval(intervalID);
    };
  }, [playing,speed]);

  /**
   * @function the following function toggles the play and pause state of the TimeLine Track.
   */
  const handlePlayPause = () => {
    setPlaying((old) => {
      if (time == 30000) {
        setTime(0);
      }
      return !old;
    });
  };

  /**
   * @function the following function toggles the playback speed state of the TimeLine Track and audios.
   */
  const handleSpeed = () => {
    timeLineTracks.map((tt, index) => {
      audioRef.current[index].playbackRate = speed == 2 ? 1 : 2;
      return null;
    });
    setSpeed((old) => (old == 1 ? 2 : 1));
    clearInterval(intervalID);
  };

  /**
   * @description the following function/eventHandler provides dragging and dropping for the tracks by calculating the distance from the track container left edge to the left edge of the track.
   * @param event React MouseDown event on any Track present in the TimeLine
   * @param index it is the index of the track on which the event is fired.
   */
  const handler = (event: React.MouseEvent, index: number) => {
    // console.log("wrapperRef", wrapperRef.current, thumbRef.current);

    event.preventDefault(); // prevent selection start (browser action)
    // console.log(event.clientX, event.currentTarget.getBoundingClientRect());

    let shiftX =
      event.clientX - event.currentTarget.getBoundingClientRect().left;
    // shiftY not needed, the thumb moves only horizontally
    // console.log("shiftX", shiftX);

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    function onMouseMove(e: MouseEvent) {
      console.log(
        e.clientX,
        shiftX,
        wrapperRef.current[index].getBoundingClientRect()
      );

      let newLeft =
        e.clientX -
        shiftX -
        wrapperRef.current[index].getBoundingClientRect().left;

      // the pointer is out of slider => lock the thumb within the bounaries
      if (newLeft < 0) {
        newLeft = 0;
      }
      let rightEdge =
        wrapperRef.current[index].offsetWidth -
        thumbRef.current[index].offsetWidth;
      if (newLeft > rightEdge) {
        newLeft = rightEdge;
      }

      // thumbRef.current[index].style.left = newLeft + "px";
      // console.log(newLeft);

      let newTimeLineTracks = timeLineTracks.map((tt, idx) => {
        if (idx == index) {
          tt.startTime =
            (newLeft / wrapperRef?.current[index].offsetWidth) * 30000;
            if (
              tt.startTime <= time &&
              time <= tt.startTime + tt.duration
            ) {
              audioRef.current[index].currentTime =
                (time - tt.startTime) / 1000;
            }else{
              audioRef.current[index].currentTime = 0;
              audioRef.current[index].pause();
            }
        }
        return tt;
      });
      // console.log(newTimeLineTracks);
      setTimeLineTracks(newTimeLineTracks);
    }

    function onMouseUp() {
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mousemove", onMouseMove);
    }
  };

  /**
   * @description the following function/eventHandler provides dragging and dropping for the timeline thumb by calculating the distance from the TimeLine container left edge to the left edge of the thumb.
   * @param e React MouseDown event on the TimeLine thumb present in the TimeLine.
   */
  const TimerDragHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    let shiftX = e.clientX - e.currentTarget.getBoundingClientRect().left;
    document.addEventListener("mousemove", onMouseMoveTimer);
    document.addEventListener("mouseup", onMouseUpTimer);

    function onMouseMoveTimer(event: MouseEvent) {
      if (timeLineRef.current && timeRef.current) {
        let newLeft =
          event.clientX -
          shiftX -
          timeLineRef.current?.getBoundingClientRect().left;
        if (newLeft < 0) {
          newLeft = 0;
        }

        let rightEdge =
          timeLineRef.current?.offsetWidth - timeRef.current?.offsetWidth;
        if (newLeft > rightEdge) {
          newLeft = rightEdge;
        }
        // console.log(newLeft);

        let newTime = (newLeft / timeLineRef.current?.offsetWidth) * 30000;

        timeLineTracks.forEach((tt, index) => {
          if (
            tt.startTime <= newTime &&
            newTime <= tt.startTime + tt.duration
          ) {
            audioRef.current[index].currentTime =
              (newTime - tt.startTime) / 1000;
          }
        });
        setTime(newTime);
      }
    }

    function onMouseUpTimer() {
      document.removeEventListener("mousemove", onMouseMoveTimer);
      document.removeEventListener("mouseup", onMouseUpTimer);
    }
  };

  /**
   * @description the following function adds a new track on the TimeLine.
   * @param param0 object containing the data of tracks i.e background color, title, duraton, source url
   */
  const addTrack = ({
    color,
    title,
    duration,
    source,
  }: {
    color: string;
    title: string;
    duration: number;
    source: string;
  }) => {
    const newTrack = {
      color,
      title,
      startTime: 0,
      endTime: duration,
      duration,
      source,
    };
    setTimeLineTracks([...timeLineTracks, newTrack]);
  };

  /**
   * @description the following function removes a track from the timeline.
   * @param index it is the index of the track which has to be removed.
   */
  const handleRemoveTrack = (index: number) => {
    let newTracks = timeLineTracks.filter((tt, idx) => idx != index);
    setTimeLineTracks(newTracks);
  };

  // calculate seconds and miliseconds using float representation of time.
  let s = Math.floor(time / 1000);
  let ms = Math.round((time % 1000) / 20);

  return (
    <div>
      {/* header */}
      <header className="p-10 text-center text-xl flex justify-center">
        ⌘iSound
      </header>
      {/* tracks */}
      <div className="p-4 flex justify-evenly gap-4 overflow-x-clip">
        {tracks.map((track, index) => (
          <div
            onClick={() =>
              addTrack({
                color: track.color,
                title: track.title,
                duration: track.duration,
                source: track.source,
              })
            }
            key={index}
            style={{ backgroundColor: track.color }}
            className={`group hover:scale-110 transition-all cursor-pointer select-none max-w-80 rounded-md p-2 flex-1 text-center `}
          >
            {track.title}
            <div className="flex gap-2 transition-all z-[5] min-w-max absolute bottom-[120%] left-0  scale-0 rounded bg-systemGbgDark-100  p-1 text-xs  text-white group-hover:scale-100">
              <p>
                duration: <span>{Math.round(track.duration / 1000)}s</span>
              </p>
              <p>
                name: <span>{track.title}</span>
              </p>
              <div className="w-1 h-6 absolute bg-systembgDark-100 left-0 top-[50%] rounded-md translate-y-2"></div>
            </div>
          </div>
        ))}
      </div>
      {/* controls of the TimeLine i.e time, playback speed, play/pause button */}
      <div className="flex justify-between p-2 select-none">
        <div className="flex-1">
          Time: {s < 10 ? `0${s}` : s}:{ms < 10 ? `0${ms}` : ms}/30:00
        </div>
        <div className="flex-1 cursor-pointer">
          {!playing ? (
            <PlayIcon onClick={handlePlayPause} className="w-6 h-6" />
          ) : (
            <PauseIcon
              onClick={handlePlayPause}
              className="text-black w-6 h-6"
            />
          )}
        </div>
        <div onClick={handleSpeed} className="cursor-pointer select-none">
          {speed}X
        </div>
      </div>
      {/* TimeLine container */}
      <div
        ref={timeLineRef}
        className="w-[calc(100vw-1rem)] overflow-visible flex flex-col gap-2 border  py-4 min-h-16 relative"
      >
        {/* TimeLine thumb */}
        <div
          ref={timeRef}
          onMouseDown={TimerDragHandler}
          draggable={true}
          onDragStart={() => false}
          style={{ left: `${(time * 100) / 30000}%` }}
          className="transition-all duration-100 -translate-y-4 z-10 cursor-pointer absolute h-[calc(100%)] flex flex-col items-center"
        >
          <div className="w-4 h-4 bg-systemTintLight-pink"></div>
          <div className="w-1 opacity-80 bg-red-300 h-full"></div>
        </div>
        {/* TimeLine Track container */}
        {timeLineTracks.map((track, index) => (
          <div
            key={index}
            ref={(element: HTMLDivElement) =>
              (wrapperRef.current[index] = element)
            }
            className={`${index % 2 == 0 ? "bg-slate-300" : ""} py-2`}
          >
            {/* TimeLine tracks */}
            <div
              ref={(element: HTMLDivElement) =>
                (thumbRef.current[index] = element)
              }
              draggable={true}
              onMouseDown={(e: React.MouseEvent) => handler(e, index)}
              onDragStart={() => false}
              style={{
                width: `${(track.duration * 100) / 30000}%`,
                position: "relative",
                left: `${(track.startTime * 100) / 30000}%`,
                backgroundColor: track.color
              }}
              className={`group relative flex items-center cursor-pointer rounded-md  p-2 flex-1 text-center`}
            >
              <p className="flex-1">{track.title}</p>
              <audio
                ref={(element: HTMLAudioElement) =>
                  (audioRef.current[index] = element)
                }
                src={track.source}
                preload="auto"
                controls
                className="hidden"
              ></audio>
              <div className="flex gap-2 transition-all z-[5] min-w-max absolute bottom-[120%] left-0  scale-0 rounded bg-systemGbgDark-100 p-1 text-xs  text-white group-hover:scale-100">
                <p>
                  start time: <span>{Math.round(track.startTime / 1000)}s</span>
                </p>
                <p>
                  duration: <span>{Math.round(track.duration / 1000)}s</span>
                </p>
                <p>
                  name: <span>{track.title}</span>
                </p>
                <div className="w-1 h-6 absolute bg-systembgDark-100 left-0 top-[50%] rounded-md translate-y-2"></div>
              </div>
              <Image
                onClick={(e) => handleRemoveTrack(index)}
                src="/assets/wrongIcon.svg"
                className="group-hover:block hidden absolute right-0 top-1/2 -translate-y-[1rem] text-white"
                width={30}
                height={30}
                alt="x"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;
