import express from "express";
import bodyParser from "body-parser";
import articleRouter from "./routes/articles.js";

const app = express();
const port = 3000;

import pg from "pg";

const db = new pg.Client({
  user: "postgres",
  host: "127.0.0.1",
  database: "World",
  password: "postgres",
  port: 5433,
});

db.connect();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/articles", articleRouter);

/*
db.query("SELECT * FROM flags", (err, res) => {
  if (err) {
    console.error("Error executing query", err.stack);
  } else {
    quiz = res.rows;
  }
  db.end();
});
*/

app.get("/", (req, res) => {
  
  const articles = [
    {title:"I am the best", createdAt:new Date(), description:"jsjhdsajdsalksajdskjdsakdsajkjk ksakdsakjdsahdsak jsakjdsak klksajsakdla"}
  ];
  res.render("articles/index.ejs", {articles: articles})
});

// GET home page
/*
app.get("/", (req, res) => {
  totalCorrect = 0;
  nextQuestion();
  console.log(currentQuestion);
  res.render("index.ejs", { question: currentQuestion });
});
*/

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
