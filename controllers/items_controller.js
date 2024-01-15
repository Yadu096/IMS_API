const Item = require("../models/items");

//controller to read data from the inventory
module.exports.readData = async function (req, res) {
  try {
    //get all the items from the inventory using the item model
    let items = await Item.find({});

    //if items is null, the inventory would be empty
    if (items.length == 0) {
      console.log("No items to display");
      return res.status(204).json({
        message: "The inventory is empty",
        data: items,
      });
    }
    //Inventory has items to send
    return res.status(200).json({
      message: "The inventory contains",
      data: items,
    });
  } catch (err) {
    console.log(err, "***Can not get the items***");
    return res.status(500).json({
      message: "Error in fetching items from the inventory",
    });
  }
};

// controller to create a document in the inventory collection
module.exports.createItem = async function (req, res) {
  try {
    //check if an item with the same name already exists
    let item = await Item.find({ name: req.body.name });
    if (item.length > 0) {
      //an item with the same name exits and hence give the client a warning
      return res.status(400).json({
        message:
          "An item with the same name already exists in the inventory, please try again",
      });
    } else {
      //check if an item with the same item id exists in the DB
      let item = await Item.find({ id: req.body.id });
      if (item.length > 0) {
        //an item with the same id exists, so give the client a warning
        return res.status(400).json({
          message:
            "An item with the same item id already exists in the inventory, please try again",
        });
      } else {
        //create the item and redirect back to the home page
        await Item.create({
          name: req.body.name,
          id: req.body.id,
          qty: req.body.qty,
          price: req.body.price,
          category: req.body.category,
          supplierInfo: req.body.supplierInfo,
        });
        return res.redirect("back");
      }
    }
  } catch (err) {
    console.log(err, "***Could not add the item***");
    return res.status(500).json({
      message: "Error in adding the item to the inventory",
    });
  }
};

//controller to update a document in the inventory collection
module.exports.updateItem = async function (req, res) {
  try {
    //check if item to be updated exists or not
    let item = await Item.findOne({ id: req.params.id });

    if (item) {
      //item exists, update it
      await Item.findOneAndUpdate(
        { id: req.params.id },
        {
          name: req.body.name,
          qty: req.body.qty,
          price: req.body.price,
          category: req.body.category,
          supplierInfo: req.body.supplierInfo,
        }
      );

      return res.redirect("http://localhost:8000/");
    } else {
      //item does not exist, so give the client a warning
      return res.status(204).json({
        message: "Item to be updated does not exist",
      });
    }
  } catch (err) {
    console.log(err, "***Error in updating the item***");
    return res.status(500).json({
      message: "Error in updating the item",
    });
  }
};

//controller to delete a document from the inventory collection
module.exports.deleteItem = async function (req, res) {
  try {
    //check if item to be deleted exists or not
    let item = await Item.findOne({ id: req.params.id });

    if (item) {
      //item exists, delete it
      await Item.deleteOne(item);

      return res.redirect("http://localhost:8000/");
    } else {
      //item does not exist, so give the client a warning
      return res.status(204).json({
        message: "Item to be deleted does not exist",
      });
    }
  } catch (err) {
    console.log(err, "***Error in deleting the item***");
    return res.status(500).json({
      message: "Could not delete the item",
    });
  }
};
