import { pool } from "../config/database.js";

// GET /api/events — all events, joined with their location's name
const getEvents = async (req, res) => {
  try {
    const results = await pool.query(
      `SELECT events.*, locations.name AS location_name
       FROM events
       LEFT JOIN locations ON events.location_id = locations.id
       ORDER BY events.event_date ASC`
    );
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/events/:id — one event, joined with its location's name
const getEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const results = await pool.query(
      `SELECT events.*, locations.name AS location_name
       FROM events
       LEFT JOIN locations ON events.location_id = locations.id
       WHERE events.id = $1`,
      [id]
    );

    if (results.rows.length === 0) {
      return res.status(404).json({ error: "event not found" });
    }

    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  getEvents,
  getEvent,
};
