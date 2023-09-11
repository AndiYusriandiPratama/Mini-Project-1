import { Link } from "react-router-dom";
import css from "./EventList.module.css";

const EventsList = ({ events }) => {
  return (
    <>
      <h2>List Events</h2>
      <div className={css.eventList}>
        {events.map((index) => (
          <div className={css.eventPreview} key={index.id}>
            <Link to={`/events/${index.id}`}>
              <h3>{index.title}</h3>
              <div className={css.imgContainer}>
                <img className={css.img} src={index.img} alt="" />
              </div>
              <p className={css.desc}>In {index.location} at {index.date}</p>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default EventsList;
