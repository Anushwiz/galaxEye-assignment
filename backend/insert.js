const fs = require("fs");
const { Client } = require("pg");

/* PostgreSQL client configuration */
const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "FirstDB",
  password: "Anush@123",
  port: 5432,
});

async function insertGeoJSON() {
  try {
    await client.connect();

    const checkQuery = "SELECT COUNT(*) FROM karnataka_tiles";
    const result = await client.query(checkQuery);
    const count = parseInt(result.rows[0].count, 10);

    if (count === 0) {
      console.log("No data found in karnataka_tiles. Inserting data...");
      /* read the data from the file */
      const geojsonData = JSON.parse(
        fs.readFileSync("karnatakaTiles.json", "utf8")
      );

      /* iterate each row */
      for (const feature of geojsonData.features) {
        const { id, properties, geometry } = feature;

        const query = `
        INSERT INTO karnataka_tiles (feature_id, properties, geom)
        VALUES ($1, $2, ST_SetSRID(ST_GeomFromGeoJSON($3), 4326))
      `;

        /* querying  */
        await client.query(query, [
          id,
          JSON.stringify(properties),
          JSON.stringify(geometry),
        ]);
      }

      console.log("Data inserted successfully");
    } else {
      console.log(
        "error while insertin data may be we have data inside the table",
        error
      );
    }
  } catch (error) {
    console.error("Error inserting data:", error);
  } finally {
    await client.end();
  }
}

insertGeoJSON();
