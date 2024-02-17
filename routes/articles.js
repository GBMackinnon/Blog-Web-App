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
        res.redirect("/");
      }
    });
    });

  router.put("/", (req, res) => {
    const articles = [
      { title: req.body["title"], createdAt: new Date(), description: req.body["description"] },
    ];
    res.render("articles/index.ejs", { articles: articles });
  });



  router.delete("/:id", async(req, res) => {
    const articleId = req.params.id;

    // SQL query to delete the article
    const deleteQuery = `
    Delete FROM articles 
    WHERE id = $1`;

        // Add article into the database
    db.query(deleteQuery, [articleId], (err, queryResult) => {
      if (err) {
        console.error("Error executing query", err.stack);
        return res.status(500).send("Internal Server Error");
      } else {
        console.log("Article Deleted");
        res.status(200).json({ message: "Article successfully deleted" });
      }
    });   
  });

  return router;
};

// Export the initializeRouter function as the default export
export default initializeRouter;