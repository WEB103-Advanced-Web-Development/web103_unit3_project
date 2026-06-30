import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import EventsAPI from '../services/EventsAPI'
import { getCompanyImage } from '../assets/companyImages'
import '../css/LocationEvents.css'

const EventDetails = () => {
    const { id } = useParams()
    const [event, setEvent] = useState({})

    useEffect(() => {
        (async () => {
            try {
                const eventData = await EventsAPI.getEventById(id)
                setEvent(eventData)
            }
            catch (error) {
                throw error
            }
        })()
    }, [id])

    const eventDate = event.event_date ? new Date(event.event_date) : null
    const date = eventDate ? eventDate.toLocaleDateString() : ''
    const time = eventDate
        ? eventDate.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
        : ''

    return (
        <div className='location-events'>
            <header>
                <div className='location-image'>
                    <img src={getCompanyImage(event.company, event.image)} alt={event.name} />
                </div>

                <div className='location-info'>
                    <h2>{event.name}</h2>
                    <p>{event.company}</p>
                    <p><i className="fa-regular fa-calendar fa-bounce"></i> {date} {time}</p>
                    <p>{event.description}</p>
                    {event.location_name &&
                        <p>Location: <Link to={`/locations/${event.location_id}`}>{event.location_name}</Link></p>
                    }
                </div>
            </header>
        </div>
    )
}

export default EventDetails
