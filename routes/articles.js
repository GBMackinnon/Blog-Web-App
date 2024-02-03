// Store all the routes related to the article

import express from "express";
const router = express.Router();

router.get("/new", (req, res) => {
  res.render("articles/new.ejs")
});

router.get("/edit", (req, res) => {
  res.render("articles/edit.ejs")
});

router.post("/", (req, res) => {

  const articles = [
    {title: req.body["title"], createdAt:new Date(), description: req.body["description"]}
  ];
  res.render("articles/index.ejs", {articles: articles})

});



// Export the router as the default export
export default router;