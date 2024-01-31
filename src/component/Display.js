import PropTypes from "prop-types";

import { faPause, faPlay, faUndo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Display({ displayState, reset, startStop }) {
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? "0" + minutes.toString() : minutes.toString()} : ${
      seconds < 10 ? "0" + seconds.toString() : seconds.toString()
    }`;
  };

  return (
    <div className="display">
      <h4>{displayState.timeType}</h4>
      <span>{formatTime(displayState.time)}</span>
      <div>
        <button id="start_stop" onClick={startStop}>
          {displayState.timeRunning ? (
            <FontAwesomeIcon icon={faPause} />
          ) : (
            <FontAwesomeIcon icon={faPlay} />
          )}
        </button>
        <button className="reset" onClick={reset}>
          <FontAwesomeIcon icon={faUndo} />
        </button>
      </div>
    </div>
  );
}

Display.propTypes = {
  displayState: PropTypes.object,
  reset: PropTypes.func,
  startStop: PropTypes.func,
};
