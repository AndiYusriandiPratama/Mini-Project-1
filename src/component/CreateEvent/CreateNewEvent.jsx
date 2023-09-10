import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import css from './CreateNewEvent.module.css'


const CreateNewEvent = () => {
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [img, setImg] = useState('')


    const event = { title, date, time, location, description, img };
    const handleSubmit = (e) => {
        e.preventDefault();


        if (description.length < 20) {
            setError('Description must be at least 20 characters.');
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
            <div className={css.background}>
                <div className={css.createNewEvent}>
                    <h2>Add Your Event Here</h2>
                    <form onSubmit={handleSubmit}>
                        <table>
                            <colgroup>
                                <col style={{ width: '150px' }} />
                                <col style={{ width: '300px' }} />
                            </colgroup>
                            <tbody>
                                <tr>
                                    <td>
                                        <label className={css.label}>Event Name:</label>
                                    </td>
                                    <td>
                                        <input
                                            className={css.inputForm}
                                            type="text"
                                            required
                                            id="event-name"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
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
                                            required
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
                                            required
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
                                            required
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
                                            required
                                            placeholder="Enter a description"
                                            rows={10}
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label className={css.label}>Image url:</label>
                                    </td>
                                    <td>
                                        <input
                                            className={css.inputForm}
                                            type="text"
                                            required
                                            placeholder="copy url here"
                                            value={img}
                                            onChange={(e) => setImg(e.target.value)}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="2" style={{ textAlign: 'center' }}>
                                        {error && <p className={css.error}> {error} </p>}
                                        {isPending && <button className={`${css.btn} ${css.addButton}`} >Add Event</button>}
                                        {!isPending && <button className={`${css.btn} ${css.addingButton}`}>Adding Event...</button>}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        </>
    );
}


export default CreateNewEvent;