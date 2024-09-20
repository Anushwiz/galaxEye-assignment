# galaxEye-assignment
Intstructions to run the application

1. Clone the Repository
2. Navigate to the project directory
3. intall dependencies
4. run the apllication
5. To run the application you need postgreSQL version 16 installed on your machine
6. Create a db with name `'FirstDB'` & create a table by below script
   ```sql
   `CREATE TABLE karnataka_tiles (
    id SERIAL PRIMARY KEY,      
    feature_id text,    
    properties JSONB,           
    geom GEOMETRY(Polygon, 4326) 
);`

7. then run `insert.js` in backend directory
8. then run `server.js` in same directory
9. then run `npm run dev` in frontend directory
10. instruction to interact with UI is provided in the UI itself
