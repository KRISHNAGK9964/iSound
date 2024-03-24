import React, { useMemo, useState } from 'react';

interface TimelineMarksProps {
   time: number
}

const TimelineMarks : React.FC<TimelineMarksProps> = ( {time} ) => {
    const [intervals, setIntervals] = useState(6);
    const markings = useMemo(()=> {
      const arr=[];
      for (let i = 0; i < 30; i++) {
          if(i == 0){
            arr.push(<span key={i*2} className='text-xs flex-1'>0s</span>)
          }
          else if(i%5 === 0){
            arr.push(<span key={i*2} className='text-xs flex-1 -translate-x-1/4'>{(i*(time/30)).toFixed(0)}s</span>);
          }else{
            arr.push(<span key={i*2} className='text-xs flex-1'>|</span>);
          }
      }
      return arr;
    },[time,intervals])
  return (
    <div className="flex cursor-default select-none text-systembgLight-100 border-systembgLight-100 py-1">
      {markings.map( element => element)}
      <span className='text-xs flex-1 absolute right-0 translate-x-full'>{time}s</span>
    </div>
  )
}

export default TimelineMarks;