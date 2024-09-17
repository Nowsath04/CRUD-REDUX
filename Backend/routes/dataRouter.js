const express = require("express");
const { CreateData, AllData, findSingleData, UpdateData, Deletedata } = require("../controllers/dataController");


const router = express.Router();

router.post("/create", CreateData)
router.get("/all-data", AllData)
router.post("/find-data/:id", findSingleData)
router.post("/update/:id", UpdateData)
router.delete("/delete/:id", Deletedata)


module.exports = router;