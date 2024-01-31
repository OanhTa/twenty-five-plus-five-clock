import "./App.css";
import AlarmSound from "./assets/AlarmSound.mp3";
import TimeSetter from "./component/TimeSetter";
import Display from "./component/Display";
import { useState, useEffect } from "react";

const defaultBreakTime = 5 * 60;
const defaultSessionTime = 25 * 60;
const min = 60;
const max = 60 * 60;
const interval = 60;

export default function App() {
  const [breakTime, setBreakTime] = useState(defaultBreakTime);
  const [sessionTime, setSessionTime] = useState(defaultSessionTime);
  const [displayState, setDisplayState] = useState({
    time: sessionTime,
    timeType: "Session",
    timeRunning: false,
  });

  useEffect(() => {
    setDisplayState((prevState) => ({ ...prevState, time: sessionTime }));
  }, [sessionTime]);

  useEffect(() => {
    let timeID;
    if (!displayState.timeRunning) return;
    else {
      timeID = window.setInterval(decrementDisplay, 1000);
    }
    return () => {
      window.clearInterval(timeID);
    };
  }, [displayState.timeRunning]);

  useEffect(() => {
    if (displayState.time === 0) {
      const audio = document.getElementById("beep");
      audio.play();
      setTimeout(function () {
        audio.pause();
      }, 10000);
      setDisplayState((prevState) => ({
        ...prevState,
        timeType: prevState.timeType === "Session" ? "Break" : "Session",
        time: prevState.time === sessionTime ? breakTime : sessionTime,
      }));
    }
  }, [displayState.time]);
  const reset = () => {
    setBreakTime(defaultBreakTime);
    setSessionTime(defaultSessionTime);
  };
  const startStop = () => {
    setDisplayState((prevState) => ({
      ...prevState,
      timeRunning: !prevState.timeRunning,
    }));
  };
  const changeBreakTime = (time) => {
    if (displayState.timeRunning) return;
    setBreakTime(time);
  };
  const changeSessionTime = (time) => {
    if (displayState.timeRunning) return;
    setSessionTime(time);
  };
  const decrementDisplay = () => {
    setDisplayState((prevState) => ({
      ...prevState,
      time: prevState.time - 1,
    }));
  };
  return (
    <div className="clock">
      <div className="setters">
        <div className="break">
          <h4 className="break-lable">Break Length</h4>
          <TimeSetter
            time={breakTime}
            setTime={changeBreakTime}
            min={min}
            max={max}
            interval={interval}
            type="break"
          />
        </div>
        <div className="session">
          <h4 className="session-lable">Session Length</h4>
          <TimeSetter
            time={sessionTime}
            setTime={changeSessionTime}
            min={min}
            max={max}
            interval={interval}
            type="session"
          />
        </div>
      </div>
      <Display
        displayState={displayState}
        reset={reset}
        startStop={startStop}
      />
      <audio id="beep" src={AlarmSound} />
    </div>
  );
}
