// framework modules/ APIs
import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

// internal modules/ components
import { PauseIcon, PlayIcon } from "../../../public/assets/svgIcons";
import TrackList from "./TrackList";
import Tooltip from "../ui/Tooltip";

interface IMainProps {}

const Main = (props: IMainProps) => {
  // console.log("Re render");

  // states of the component(Timeline Track) i.e current time, play/pause, playback speed, tracks etc. ------------------------------------------------- //
  const [timeLineDuration, setTimeLineDuration] = useState(30000);
  const [intervalDuration, setIntervalDuration] = useState(100);
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [timeLineTracks, setTimeLineTracks] = useState<TrackType[]>([]);
  const [intervalID, setintervalID] = useState<NodeJS.Timeout>();

  // reference to the DOM Elements of(Timeline Track) i.e timeline container,  timeline thumb, track container, track, audio etc. ----------------------- //
  const timeLineRef = useRef<HTMLDivElement | null>(null);
  const timeRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<Array<HTMLDivElement>>(new Array());
  const thumbRef = useRef<Array<HTMLDivElement>>(new Array());
  const audioRef = useRef<Array<HTMLAudioElement>>(new Array());

  // ----------------------------------------------$ TimeLine mutations(states:[play/pause , speed, timeLineTracks, time...]) $---------------------------------------------------//

  /**
   * @function the following function toggles the play and pause state of the TimeLine Track.
   */
  const handlePlayPause = () => {
    setTime((old) => (old === timeLineDuration ? 0 : old));
    setPlaying((old) => !old);
  };

  /**
   * @function the following function toggles the playback Rate of the TimeLine Track.
   */
  const handleSpeed = () => {
    setSpeed((old) => (old == 1 ? 2 : 1));
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
    setTimeLineTracks((old) => [...old, newTrack]);
  };

  /**
   * @description the following function removes a track from the timeline.
   * @param index it is the index of the track which has to be removed.
   */
  const handleRemoveTrack = (index: number) => {
    let newTracks = timeLineTracks.filter((_, idx) => idx != index);
    setTimeLineTracks(newTracks);
  };

  // -------------------------------------------------$ Timeline subscriptions(states:[speed,time,timeLineTracks...]) $---------------------------------------------------- //
  
  /**
   * @description update playBackRate of AudioElements with the given rate.
   */
  const updatePlaybackRate = (rate: number,tracks:TrackType[],audioElementarr : HTMLAudioElement[]) => {
    tracks.forEach((_,index) => {
      audioElementarr[index].playbackRate = rate;
    });
  };
  
  useEffect(() => {
    audioRef.current && updatePlaybackRate(speed,timeLineTracks,audioRef.current);
  }, [speed, timeLineTracks.length, audioRef.current.length]);

  /**
   * @description update currentTime and state of audioTrack wrt to time.
   */
  const handleTrackscurrentTimeAndState = (time: number,state: boolean, tracks:TrackType[], audioElementArr : HTMLAudioElement[]) => {
    tracks.forEach((tt, index) => {
      if (tt.startTime <= time && time <= tt.startTime + tt.duration) {
        if (audioRef.current[index].paused) audioElementArr[index].currentTime = (time - tt.startTime) / 1000;
        state ? audioElementArr[index].play() : audioElementArr[index].pause();
      }
      if (time >= tt.startTime + tt.duration) {
        audioElementArr[index].pause();
        audioElementArr[index].currentTime =
          audioElementArr[index].duration;
      }
    });
  }

  const pauseAllTracks = (tracks:TrackType[], audioElementArr : HTMLAudioElement[]) => {
    tracks.forEach((_, index) => {
      audioElementArr[index].pause();
    });
  }

  const updateTime = (time:number,constraint: number) => {
    setTime((old) => {
      if (old >= constraint) {
        setPlaying(false);
        return constraint;
      } else {
        let newtime = old + time;
        return newtime;
      }
    });
  }
  /**
   * @description The following hook triggers on changing state(play/pause) of Timeline Track.
   * It sets an timeinterval for which the state(time) is updated and tracks that are overlapping are played, others are paused.
   */
  useEffect(() => {
    clearInterval(intervalID);
    if (playing) {
      handleTrackscurrentTimeAndState(time,true,timeLineTracks,audioRef.current);
      const ID = setInterval(updateTime, intervalDuration,speed*intervalDuration,timeLineDuration);
      setintervalID(ID);
    } else {
      pauseAllTracks(timeLineTracks,audioRef.current);
    }
    return () => {
      clearInterval(intervalID);
    };
  }, [playing, speed]);


  useEffect(() => {
    if (playing) {
      handleTrackscurrentTimeAndState(time,true,timeLineTracks,audioRef.current);
    } else {
      // (case : when we drag thumb and timeline is paused. )
      handleTrackscurrentTimeAndState(time,false,timeLineTracks,audioRef.current);
    }
  }, [time]);

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
      // console.log(
      //   e.clientX,
      //   shiftX,
      //   wrapperRef.current[index].getBoundingClientRect()
      // );

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
          if (tt.startTime <= time && time <= tt.startTime + tt.duration) {
            audioRef.current[index].currentTime = (time - tt.startTime) / 1000;
          } else {
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
    setPlaying(false);
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
        setTime(newTime);
      }
    }

    function onMouseUpTimer() {
      document.removeEventListener("mousemove", onMouseMoveTimer);
      document.removeEventListener("mouseup", onMouseUpTimer);
    }
  };

  // calculate seconds and miliseconds using float representation of time.
  let s = useMemo(() => Math.floor(time / 1000), [time]);
  let ms = useMemo(() => Math.round((time % 1000) / 20), [time]);

  return (
    <div>
      {/* header */}
      <header className="p-10 text-center text-xl flex justify-center">
        ⌘iSound
      </header>
      {/* tracks */}
      <TrackList addTrack={addTrack} />
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
                backgroundColor: track.color,
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
              <Tooltip track={track} />
              <Image
                onClick={(e) => handleRemoveTrack(index)}
                src="/assets/wrongIcon.svg"
                className="group-hover:block hidden absolute right-0 top-1/2 -translate-y-[1rem] text-white"
                width={30}
                height={30}
                alt="x icon"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;
