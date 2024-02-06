import express from "express";
import bodyParser from "body-parser";
import articleRouter from "./routes/articles.js";

const app = express();
const port = 3000;

import pg from "pg";

const db = new pg.Client({
  user: "postgres",
  host: "127.0.0.1",
  database: "Blog",
  password: "postgres",
  port: 5433,
});

db.connect();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Mounting the router
// Tells the Express app to use the articleRouter middleware when handling
// requests that start with "/articles 
// Passing in the db and articles so they can be used in articles.js

let articles = [];

function getAllArticles(callback){
  // Query the database and save in an array called articles
  db.query("SELECT * FROM articles", (err, res) => {
    if (err) {
      console.error("Error executing query", err.stack);
    } else {
      articles = res.rows;
    }
      // Invoke the callback, passing the updated articles
      callback(articles);
  });
}

app.use("/articles", articleRouter(db, articles));

app.get("/", (req, res) => {
  // Call getAllArticles with a callback function
  getAllArticles((updatedArticles) => {
    console.log(updatedArticles);
    res.render("articles/index.ejs", { articles: updatedArticles });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
