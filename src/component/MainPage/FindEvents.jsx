// import { Link } from "react-router-dom";
// import EventDetails from '../FindEvents/EventDetails'
import EventsList from "../FindEvents/EventList";
import useFetch from "../FindEvents/useFetch";

const FindEvents = () => {
  const {
    data: events,
    isPending,
    error,
  } = useFetch("http://localhost:8001/events");
  return (
    <div>
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {events && <EventsList events={events} />}
    </div>
  );
};

export default FindEvents;
