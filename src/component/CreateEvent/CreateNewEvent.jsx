import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import './CreateNewEventStyle.css'

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

        if (description.length < 100) {
            setError('Event description must be at least 100 characters.');
            return;
        }
        setError('')

        setIsPending(false)

        fetch('http://localhost:8000/events/', {
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
            <h2>Add New Event</h2>
            <div className="create-new-event">

                <form onSubmit={handleSubmit}>

                    <label>Event Name:</label>
                    <input className="input-form-event"
                        type="text"
                        id="event-name"
                        // required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <label>Select a Date:</label>
                    <input className="input-form-event"
                        type="date"
                        id="event-date"
                        // required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />

                    <label>Select a Time:</label>
                    <input className="input-form-event"
                        type="time"
                        id="event-time"
                        // required
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    />

                    <label>Enter Location:</label>
                    <input className="input-form-event"
                        type="text"
                        id="location"
                        // required
                        placeholder="E.g., Jakarta Selatan"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />

                    <label>Description:</label>
                    <textarea className="input-form-event"
                        type="text"
                        id="description"
                        // required
                        placeholder="Enter a description"
                        rows={10}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    {error && <p>{error}</p>}

                    {isPending && <button>Add Event</button>}
                    {!isPending && <button>Adding Event...</button>}
                </form>
            </div>
        </>
    );
}

export default CreateNewEvent;
