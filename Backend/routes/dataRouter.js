const express = require("express");
const { CreateData, AllData, findSingleData, UpdateData, Deletedata, userFavourite, GetFavourite } = require("../controllers/dataController");


const router = express.Router();

router.post("/create", CreateData)
router.get("/all-data", AllData)
router.post("/find-data/:id", findSingleData)
router.post("/update/:id", UpdateData)
router.delete("/delete/:id", Deletedata)
router.post("/favourite", userFavourite)
router.get("/get-favourite/:id", GetFavourite)


module.exports = router;