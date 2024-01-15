const express = require("express");
const router = express.Router();
const itemsController = require("../../../controllers/items_controller");

//route to get data from the inventory
router.get("/read", itemsController.readData);

//route to create a document in the inventory collection
router.post("/create", itemsController.createItem);

//route to update a document in the inventory collection
router.post("/update/:id", itemsController.updateItem);

//route to delete a document from the inventory collection
router.get("/delete/:id", itemsController.deleteItem);

module.exports = router;
