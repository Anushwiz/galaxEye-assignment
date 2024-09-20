const express = require("express");
const bodyParser = require("body-parser");
const turf = require("@turf/turf");
const cors = require("cors");
const { Client } = require("pg");

const app = express();
const PORT = process.env.PORT || 5000;

/* Middleware */
app.use(cors());
app.use(bodyParser.json());

/* PostgreSQL client configuration */
const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "FirstDB",
  password: "Anush@123",
  port: 5432,
});

client
  .connect()
  .then(() => console.log("Connected to PostgreSQL database"))
  .catch((err) => console.error("Database connection error:", err));

/* Cheking tiles loaded or not */
app.get("/api/check-tiles", async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM karnataka_tiles");
    if (result.rows.length > 0) {
      return res.status(200).json({
        success: true,
        message: "Data loaded in backend",
        /* data: result.rows, */
      });
    }
    return res
      .status(500)
      .json({ success: false, message: "No data found in Backend" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error fetching data", error });
  }
});

/* Finding intersection */
app.post("/api/aoi", async (req, res) => {
  const aoi = req.body;

  try {
    const result = await client.query(
      "SELECT *, ST_AsGeoJSON(geom) AS geom FROM karnataka_tiles;"
    );

    const karnatakaTiles = result.rows.map((row) => ({
      type: "Feature",
      properties: row.properties,
      geometry: {
        type: "Polygon",
        coordinates: JSON.parse(row.geom)
          .coordinates /* formating the geom data */,
      },
      id: row.feature_id,
    }));

    /* logic for checking intersection */
    const intersectingTiles = karnatakaTiles.filter((tile) =>
      turf.booleanIntersects(tile.geometry, aoi.geometry)
    );

    res.json(intersectingTiles);
  } catch (error) {
    console.error("Error fetching tiles:", error);
    return res
      .status(500)
      .json({ success: false, message: "Error fetching tiles", error });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
