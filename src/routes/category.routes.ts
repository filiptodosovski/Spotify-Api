const category = require("../controllers/category.controller");
const category_router = require('express').Router();

category_router.get("/", category.getCategories),
category_router.post("/fetch", category.insertCategories)

module.exports = category_router;