import express from "express";
import LocationsController from "../controllers/locations.js";

const router = express.Router();

router.get("/", LocationsController.getLocations);
router.get("/:id", LocationsController.getLocation);
router.get("/:id/events", LocationsController.getLocationEvents);

export default router;
