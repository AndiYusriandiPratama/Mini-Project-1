import { useParams, useNavigate } from "react-router-dom";
import useFetch from "./useFetch";
import css from "./EventDetails.module.css";

const EventDetails = () => {
  const { id } = useParams();
  const {
    data: events,
    error,
    isPending,
  } = useFetch("http://localhost:8001/events/" + id);
  const navigate = useNavigate();

  const handleDeleteClick = () => {
    fetch("http://localhost:8001/events/" + events.id, {
      method: "DELETE",
    }).then(() => {
      navigate("/find-events");
    });
  };

  return (
    <div>
      {isPending && <div>Loading....</div>}
      {error && <div>{error}</div>}
      {events && (
        <article>
          <div>
            <h2 className={css.title}>{events.title}</h2>
          </div>
          <div className={css.articleContainer}>
            <div className={css.imgContainer}>
              <img className={css.img} src={events.img} alt="" />
            </div>
            <p className={css.location}>Location: {events.location}</p>
            <p className={css.date}>Date: {events.date}</p>
            <div className={css.description}>{events.description}</div>
          </div>
          <div className={css.btnContainer}>
            <button onClick={handleDeleteClick} className={css.btn}>
              delete
            </button>
          </div>
        </article>
      )}
    </div>
  );
};

export default EventDetails;
