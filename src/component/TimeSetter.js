import PropTypes from "prop-types";

import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TimeSetter({
  time,
  setTime,
  min,
  max,
  interval,
  type,
}) {
  return (
    <>
      <button
        onClick={() => (time > min ? setTime(time - interval) : null)}
        // time > 1 second ? time - 1 second or null
        className={type}
      >
        <FontAwesomeIcon icon={faArrowDown} />
      </button>
      <span className="time">{time / interval}</span>
      <button
        onClick={() => (time < max ? setTime(time + interval) : null)}
        // time < 60 second ? time + 1 second or null
        className={type}
      >
        <FontAwesomeIcon icon={faArrowUp} />
      </button>
    </>
  );
}
TimeSetter.propTypes = {
  time: PropTypes.number,
  setTime: PropTypes.func,
  min: PropTypes.number,
  max: PropTypes.number,
  interval: PropTypes.number,
  type: PropTypes.oneOf(["break", "session"]),
};
