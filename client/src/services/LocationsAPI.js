const BASE_URL = '/api/locations'

// GET /api/locations — every location
const getAllLocations = async () => {
    try {
        const response = await fetch(BASE_URL)
        return await response.json()
    } catch (error) {
        return error
    }
}

// GET /api/locations/:id — a single location by id
const getLocationById = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}`)
        return await response.json()
    } catch (error) {
        return error
    }
}

// GET /api/locations/:id/events — every event taking place at a location
const getLocationEvents = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/${id}/events`)
        return await response.json()
    } catch (error) {
        return error
    }
}

export default {
    getAllLocations,
    getLocationById,
    getLocationEvents,
}
