const express = require("express");
const router = express.Router(); // Fixed: Changed express() to express.Router()
let ownerModel = require("../Models/owner-model");

router.get("/", async (req, res) => {
  res.send("Everything just fine");
});

// DEV routes
if (process.env.NODE_ENV === "development") {
  router.post("/create", async (req, res) => {
    try {
      let { fullname, email, password, contact } = req.body;
      let owners = await ownerModel.find();
      if (owners.length > 0) {
        return res.send({ // Added return here to cleanly stop execution
          response: "Their can be only 1 owner",
        });
      } 
      
      let createdOwner = await ownerModel.create({
        fullname,
        email,
        password,
        contact,
      });
      res.send(createdOwner);
    } catch (err) {
      res.send(err.message);
    }
  }); // Moved try/catch cleanly inside the route handler callback
}

router.get("/admin", async (req, res) => {
  let success = req.flash("success");
  res.render('createproducts', { success });
});

// Fixed: Removed the empty router.post('/') line that was causing the crash

module.exports = router;
