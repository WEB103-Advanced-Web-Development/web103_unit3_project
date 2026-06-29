const BASE_URL = '/api/events'

// GET /api/events — every event, joined with its location's name
const getAllEvents = async () => {
    try {
        const response = await fetch(BASE_URL)
        return await response.json()
    } catch (error) {
        return error
    }
}

// GET /api/events/:id — a single event by id
const getEventById = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`)
        return await response.json()
    } catch (error) {
        return error
    }
}

export default {
    getAllEvents,
    getEventById,
}
