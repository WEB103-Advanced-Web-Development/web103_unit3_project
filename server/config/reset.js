import dotenv from "dotenv";
import { pool } from "./database.js";

dotenv.config();

// --- Sample data: a Virtual Career Tech Fair ---

const locations = [
  {
    name: "Main Auditorium",
    description:
      "The flagship stage of the fair, home to keynotes and talks from the biggest names in tech.",
    capacity: 1000,
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800",
  },
  {
    name: "Startup Pavilion",
    description:
      "Meet founders and early-stage teams. Hear how companies go from an idea to launch.",
    capacity: 250,
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800",
  },
  {
    name: "Workshop Lab",
    description:
      "Roll up your sleeves. Hands-on coding sessions where you build something real.",
    capacity: 100,
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800",
  },
  {
    name: "Recruiter Lounge",
    description:
      "Casual 1:1 chats, resume reviews, and networking with recruiters from top companies.",
    capacity: 150,
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800",
  },
];

// location_id below is 1-based and matches the insertion order of `locations` above.
const events = [
  {
    name: "Cracking the Coding Interview",
    company: "Google",
    description:
      "A live walkthrough of how Google interviews engineers, with tips on data structures and problem solving.",
    event_date: "2026-07-15 09:00:00",
    location_id: 1,
    image: "https://logo.clearbit.com/google.com",
  },
  {
    name: "Building the Cloud: Azure Careers",
    company: "Microsoft",
    description:
      "Explore careers in cloud computing and what it takes to work on Azure at scale.",
    event_date: "2026-07-15 10:30:00",
    location_id: 1,
    image: "https://logo.clearbit.com/microsoft.com",
  },
  {
    name: "Scaling Startups from 0 to 1",
    company: "Stripe",
    description:
      "How Stripe thinks about building products and teams in the earliest stages of a company.",
    event_date: "2026-07-15 11:00:00",
    location_id: 2,
    image: "https://logo.clearbit.com/stripe.com",
  },
  {
    name: "Founders Q&A: Life at a Seed Company",
    company: "Vercel",
    description:
      "An unfiltered Q&A with founders about the realities of joining and building an early-stage startup.",
    event_date: "2026-07-15 12:30:00",
    location_id: 2,
    image: "https://logo.clearbit.com/vercel.com",
  },
  {
    name: "Hands-On: Build a React App in 90 Minutes",
    company: "Meta",
    description:
      "A guided workshop where you build and ship a small React application from scratch.",
    event_date: "2026-07-15 13:00:00",
    location_id: 3,
    image: "https://logo.clearbit.com/meta.com",
  },
  {
    name: "Intro to ML Pipelines",
    company: "NVIDIA",
    description:
      "Get hands-on with the building blocks of a modern machine learning pipeline.",
    event_date: "2026-07-15 14:30:00",
    location_id: 3,
    image: "https://logo.clearbit.com/nvidia.com",
  },
  {
    name: "Resume Review Speed Round",
    company: "Amazon",
    description:
      "Bring your resume for rapid-fire feedback from Amazon recruiters.",
    event_date: "2026-07-15 15:00:00",
    location_id: 4,
    image: "https://logo.clearbit.com/amazon.com",
  },
  {
    name: "Networking Mixer: Meet the Recruiters",
    company: "LinkedIn",
    description:
      "A relaxed networking session to connect with recruiters and other attendees.",
    event_date: "2026-07-15 16:30:00",
    location_id: 4,
    image: "https://logo.clearbit.com/linkedin.com",
  },
];

// --- Reset + seed the locations table ---

const createLocationsTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS locations CASCADE;

    CREATE TABLE IF NOT EXISTS locations (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      capacity INTEGER,
      image VARCHAR(500)
    );
  `;

  try {
    await pool.query(createTableQuery);
    console.log("🎯 locations table created successfully");
  } catch (error) {
    console.error("⚠️ error creating locations table", error);
  }
};

const seedLocationsTable = async () => {
  await createLocationsTable();

  for (const location of locations) {
    const insertQuery = {
      text: `INSERT INTO locations (name, description, capacity, image)
             VALUES ($1, $2, $3, $4)`,
      values: [
        location.name,
        location.description,
        location.capacity,
        location.image,
      ],
    };

    try {
      await pool.query(insertQuery);
      console.log(`✅ ${location.name} added to locations`);
    } catch (error) {
      console.error(`⚠️ error inserting ${location.name}`, error);
    }
  }
};

// --- Reset + seed the events table ---

const createEventsTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS events CASCADE;

    CREATE TABLE IF NOT EXISTS events (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      company VARCHAR(255) NOT NULL,
      description TEXT,
      event_date TIMESTAMP,
      location_id INTEGER REFERENCES locations(id) ON DELETE CASCADE,
      image VARCHAR(500)
    );
  `;

  try {
    await pool.query(createTableQuery);
    console.log("🎯 events table created successfully");
  } catch (error) {
    console.error("⚠️ error creating events table", error);
  }
};

const seedEventsTable = async () => {
  await createEventsTable();

  for (const event of events) {
    const insertQuery = {
      text: `INSERT INTO events (name, company, description, event_date, location_id, image)
             VALUES ($1, $2, $3, $4, $5, $6)`,
      values: [
        event.name,
        event.company,
        event.description,
        event.event_date,
        event.location_id,
        event.image,
      ],
    };

    try {
      await pool.query(insertQuery);
      console.log(`✅ ${event.name} added to events`);
    } catch (error) {
      console.error(`⚠️ error inserting ${event.name}`, error);
    }
  }
};

// locations must be seeded first because events reference them via a foreign key.
const seedDatabase = async () => {
  await seedLocationsTable();
  await seedEventsTable();
  await pool.end();
  console.log("🌱 database seeded — done!");
};

seedDatabase();
