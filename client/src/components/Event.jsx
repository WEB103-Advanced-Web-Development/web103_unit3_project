import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getCompanyImage } from '../assets/companyImages'
import '../css/Event.css'

const Event = (props) => {

    const navigate = useNavigate()

    const image = getCompanyImage(props.company, props.image)

    // event_date comes from the API as a timestamp string, e.g. "2026-07-15T09:00:00.000Z"
    const eventDate = props.event_date ? new Date(props.event_date) : null
    const date = eventDate ? eventDate.toLocaleDateString() : ''
    const time = eventDate
        ? eventDate.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
        : ''

    return (
        <article className='event-information' onClick={() => navigate(`/events/${props.id}`)} style={{ cursor: 'pointer' }}>
            <img src={image} alt={props.name} />

            <div className='event-information-overlay'>
                <div className='text'>
                    <h3>{props.name}</h3>
                    <p>{props.company}</p>
                    <p><i className="fa-regular fa-calendar fa-bounce"></i> {date} <br /> {time}</p>
                    <p>{props.description}</p>
                </div>
            </div>
        </article>
    )
}

export default Event
