import { pool } from "../config/database.js";

// GET /api/locations — all locations
const getLocations = async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM locations ORDER BY id ASC");
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/locations/:id — one location
const getLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const results = await pool.query("SELECT * FROM locations WHERE id = $1", [
      id,
    ]);

    if (results.rows.length === 0) {
      return res.status(404).json({ error: "location not found" });
    }

    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/locations/:id/events — every event taking place at this location
const getLocationEvents = async (req, res) => {
  try {
    const { id } = req.params;
    const results = await pool.query(
      "SELECT * FROM events WHERE location_id = $1 ORDER BY event_date ASC",
      [id]
    );
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  getLocations,
  getLocation,
  getLocationEvents,
};
