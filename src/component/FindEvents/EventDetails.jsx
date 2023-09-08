import { useParams, useNavigate } from "react-router-dom";
import useFetch from "./useFetch";
import css from './EventDetails.module.css'

const EventDetails = () => {
    const { id } = useParams();
    const { data: events, error, isPending } = useFetch('http://localhost:8001/events/' + id)
    const navigate = useNavigate()

    const handleDeleteClick = () => {
        fetch('http://localhost:8001/events/' + events.id, {
            method: 'DELETE'
        }).then(() => {
            navigate('/find-events')
        })
    }

    return (
        <div>
            {isPending && <div>Loading....</div>}
            {error && <div>{error}</div>}
            {events && (
                <article>
                    <h2>{events.title}</h2>
                    <p>Location {events.location}</p>
                    <div>{events.description}</div>
                    <button onClick={handleDeleteClick} className={css.btn}>delete</button>
                </article>
            )}
        </div>
    );
}

export default EventDetails;