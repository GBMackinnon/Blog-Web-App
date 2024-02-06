// Store all the routes related to the article

import express from "express";
const router = express.Router();

// Function to initialize the router with the database connection
const initializeRouter = (db, articles) => {
  router.get("/new", (req, res) => {
    res.render("articles/new.ejs");
  });

  router.get("/edit", (req, res) => {
    res.render("articles/edit.ejs");
  });

  router.post("/", (req, res) => {  
    // Create an article
    const article = {
    title: req.body["title"],
    description: req.body["description"],
    markdown: req.body["markdown"], 
    created_at: new Date() 
  };

    // SQL query to insert the article
    const insertQuery = `
    INSERT INTO articles (title, description, markdown, created_at)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
    `;

    // Add article into the database
    db.query(insertQuery, [article.title, article.description, article.markdown, article.created_at ], (err, queryResult) => {
      if (err) {
        console.error("Error executing query", err.stack);
      } else {
        const insertedArticle = queryResult.rows[0];
        console.log("Inserted Article:", insertedArticle);
      }
    });
    
    res.redirect("/");
    });

  router.put("/", (req, res) => {
    const articles = [
      { title: req.body["title"], createdAt: new Date(), description: req.body["description"] },
    ];
    res.render("articles/index.ejs", { articles: articles });
  });

  return router;
};

// Export the initializeRouter function as the default export
export default initializeRouter;