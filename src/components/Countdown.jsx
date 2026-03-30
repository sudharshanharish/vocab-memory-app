import { useEffect, useState } from "react";
import { convertMilliseconds, countdownIn24Hours } from "../utils";

export default function Countdown(props) {

  const {handleChangePage, daysWords, datetime, day} = props;
  
  const targetMillis = datetime || Date.UTC(1947,2,17,12,0,0);

    const [remainingMs, setRemainingMs] = useState(countdownIn24Hours(targetMillis))



  const timer = convertMilliseconds(remainingMs)
   // console.log(timer);
    useEffect(()=> {
        const interval = setInterval(()=>{
          setRemainingMs(countdownIn24Hours(targetMillis))
        },1000)
        return () => clearInterval(interval)
     },[targetMillis])

  return (
    <div className="card countdown-card">
      <h1 className="item-header">Day {day}</h1>

      <div className="today-container">
        <p>Time Remaining</p>
        <h3>{datetime ? `${Math.abs(timer.hours)}H 
        ${Math.abs(timer.minutes)}M
         ${Math.abs(timer.seconds)}S`: '24H 60M 60S'}</h3>
      </div>

      <div>
        <p>Words for Today</p>
        <h3>{daysWords.length}</h3>
      </div>

      <button onClick={()=>{
        handleChangePage(2)
      }} className="start-task">
        <h6>Start</h6>
      </button>
    </div>
  );
}