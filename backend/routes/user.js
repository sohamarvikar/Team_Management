const express = require("express");
const router = express.Router();
const { createUser } = require("../controller/createUser");
const { getUser } = require("../controller/getUsers");
const getAllCategory = require("../controller/getAllCategory");
const deleteUser = require("../controller/deleteUser");
const createCategory = require("../controller/createCategory");


router.post("/createUser", createUser);
router.post("/createCategory", createCategory);
router.get("/getallUsers", getUser);
router.get('/getAllCategories',getAllCategory)
router.delete('/deleteUser',deleteUser)
module.exports = router;
