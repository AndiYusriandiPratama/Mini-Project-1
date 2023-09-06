import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import css from './CreateNewEvent.module.css'

const CreateNewEvent = () => {
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const event = { name, date, time, location, description };

        if (description.length < 20) {
            setError('Event description must be at least 20 characters.');
            return;
        }
        setError('')

        setIsPending(false)

        fetch('http://localhost:8001/events/', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(event)
        }).then(() => {
            console.log('new event added');
            setIsPending(true)
            // *-1 mean going back once*
            // navigate(-1)
            navigate('/')
        })

    }

    return (
        <>
            <div className={css.createNewEvent}>
                <h2>Add New Event</h2>
                <form onSubmit={handleSubmit}>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <label className={css.label}>Event Name:</label>
                                </td>
                                <td>
                                    <input
                                        className={css.inputForm}
                                        type="text"
                                        id="event-name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label className={css.label}>Select a Date:</label>
                                </td>
                                <td>
                                    <input
                                        className={css.inputForm}
                                        type="date"
                                        id="event-date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label className={css.label}>Select a Time:</label>
                                </td>
                                <td>
                                    <input
                                        className={css.inputForm}
                                        type="time"
                                        id="event-time"
                                        value={time}
                                        onChange={(e) => setTime(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label className={css.label}>Enter Location:</label>
                                </td>
                                <td>
                                    <input
                                        className={css.inputForm}
                                        type="text"
                                        id="location"
                                        placeholder="E.g., Jakarta Selatan"
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label className={css.label}>Description:</label>
                                </td>
                                <td>
                                    <textarea
                                        className={css.inputForm}
                                        type="text"
                                        id="description"
                                        placeholder="Enter a description"
                                        rows={10}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    {error && <p>{error}</p>}
                                    {isPending && <button className={`${css.btn} ${css.addButton}`} >Add Event</button>}
                                    {!isPending && <button className={`${css.btn} ${css.addingButton}`}>Adding Event...</button>}

                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </>
    );
}

export default CreateNewEvent;
