import express from "express"
import mysql from "mysql"
import cors from "cors"
import dotenv from 'dotenv';
import fs from 'fs';

// Determine which .env file to use based on NODE_ENV
const envFile = `.env.${process.env.NODE_ENV || 'dev'}`;

// Check if the file exists
if (fs.existsSync(envFile)) {
  dotenv.config({ path: envFile });
} else {
  // Fallback to default .env file if specific env file is not found
  dotenv.config();
}

const app = express();

// Allow requests from all origins
app.use(express.json());
app.use(cors());


 const db = mysql.createConnection({
     host: process.env.REACT_APP_DB_HOST,
     user: process.env.REACT_APP_DB_USERNAME,
     password: process.env.REACT_APP_DB_PASS,
     database: "katanim"
 });


app.get("/products", (req, res) => {
    const q = "SELECT * FROM product"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
});

app.get("/products/:id", (req, res) => {
    const { id } = req.params;
    const q = "SELECT * FROM product WHERE id = ?"
    db.query(q, [id], (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
});

app.get("/categories", (req, res) => {
    const q = "SELECT * FROM category"
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

app.post("/products", (req, res) => {
    console.log('ben');
     const { title, price, description, categoryid, imageUrl } = req.body;
  console.log(req.body);
  // Insert data into MySQL table
  const sql = 'INSERT INTO product (title, price, description, categoryid, imageUrl) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [title, price, description, categoryid, imageUrl], (err, result) => {
    if (err) {
      console.error('Error inserting data into database:', err);
      res.status(500).json({ error: 'Error inserting data into database' });
      return;
    }
    console.log('Data inserted into database');
    res.status(201).json({ message: 'Product added successfully' });
  }); 

})

const port = process.env.PORT || 50001;

app.listen(port, () => {
    console.log(process.env.REACT_APP_DB_PASS);
    console.log("Connected to backend!")
})