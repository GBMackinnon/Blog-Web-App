// Store all the routes related to the article

import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
    res.send("In articles")
});

router.get("/new", (req, res) => {
  res.render("articles/new.ejs")
});

router.post("/submit", (req, res) => {

  const articles = [
    {title: req.body["title"], createdAt:new Date(), description: req.body["description"]}
  ];
  res.render("articles/index.ejs", {articles: articles})

});



// Export the router as the default export
export default router;